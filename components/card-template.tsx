"use client";

import { forwardRef, useImperativeHandle, useEffect, useState } from "react";

export type CardVariant = "dark" | "light";

interface CardTemplateProps {
  userName: string;
  variant: CardVariant;
  onTextureReady: (dataUrl: string) => void;
  city?: string;
  date?: string;
}

export interface CardTemplateRef {
  captureTexture: () => Promise<void>;
  exportCard: () => void;
}

const CANVAS_SIZE = 1376;

const CardTemplate = forwardRef<CardTemplateRef, CardTemplateProps>(
  ({ userName, variant, onTextureReady, city, date }, ref) => {

    const captureTexture = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = CANVAS_SIZE;
      canvas.height = CANVAS_SIZE;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      // Only the left half is the front face of the 3D card. Center is at CANVAS_SIZE / 4
      const FRONT_CENTER = CANVAS_SIZE / 4 + 20; // Slight offset to match original padding

      // Draw background - front face will be at left side
      ctx.fillStyle = variant === "dark" ? "#050505" : "#ffffff";
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // Draw gradient border/accent
      const grad = ctx.createLinearGradient(0, 0, CANVAS_SIZE / 2, CANVAS_SIZE);
      grad.addColorStop(0, "#9333ea"); // purple
      grad.addColorStop(0.5, "#3b82f6"); // blue
      grad.addColorStop(1, "#f97316"); // orange
      
      ctx.lineWidth = 20;
      ctx.strokeStyle = grad;
      ctx.strokeRect(20, 20, CANVAS_SIZE / 2 - 40, CANVAS_SIZE - 40);

      // Load and draw real logo
      const logoImg = new Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.src = "/logo.png";
      
      await new Promise<void>((resolve) => {
        logoImg.onload = () => resolve();
        logoImg.onerror = () => resolve(); // Continue even if missing
      });

      if (logoImg.complete && logoImg.naturalHeight !== 0) {
        const logoSize = 180;
        ctx.drawImage(logoImg, FRONT_CENTER - (logoSize / 2), 150, logoSize, logoSize);
      } else {
        // Fallback Logo proxy
        ctx.fillStyle = grad;
        ctx.fillRect(FRONT_CENTER - 75, 150, 150, 150);
        ctx.fillStyle = variant === "dark" ? "#000" : "#fff";
        ctx.font = 'bold 60px sans-serif';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("LSU", FRONT_CENTER, 225);
      }

      // Ensure text alignment is always centered for the rest of the typography regardless of image load
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Company text
      ctx.fillStyle = variant === "dark" ? "#ffffff" : "#000000";
      ctx.font = 'bold 50px sans-serif';
      ctx.fillText("LITESTARTUP", FRONT_CENTER, 400);
      
      ctx.fillStyle = "#888888";
      ctx.font = '28px monospace';
      ctx.fillText("SOCIEDAD PA".toUpperCase(), FRONT_CENTER, 460);

      // User text
      const displayName = userName || "TALENTO GLOBAL";
      ctx.fillStyle = variant === "dark" ? "#ffffff" : "#000000";
      ctx.font = 'bold 80px monospace';
      ctx.fillText(displayName.toUpperCase(), FRONT_CENTER, CANVAS_SIZE / 2 + 100);

      // Decorator lines
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(FRONT_CENTER - 150, CANVAS_SIZE / 2 + 180, 300, 8);

      // Footer
      ctx.fillStyle = "#666666";
      ctx.font = '30px monospace';
      ctx.fillText("INNOVANDO EL FUTURO HOY", FRONT_CENTER, CANVAS_SIZE - 200);

      const dataUrl = canvas.toDataURL("image/png");
      onTextureReady(dataUrl);
    };

    const exportCard = () => {
      // Not strictly necessary since we just want the texture to show but let's fulfill the interface
      captureTexture();
    };

    useImperativeHandle(ref, () => ({
      captureTexture,
      exportCard,
    }));

    useEffect(() => {
      captureTexture();
    }, [userName, variant, city, date]);

    return null;
  }
);

CardTemplate.displayName = "CardTemplate";

export default CardTemplate;
