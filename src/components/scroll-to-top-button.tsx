"use client";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import useScrollPastThreshold from "@/hooks/use-scroll-past-threshold";

export default function ScrollToTopButton() {
    const showBackToTop = useScrollPastThreshold(800);

    if (!showBackToTop) return null;
    return (
        <Button variant="outline" size="icon" className="fixed z-50 rounded-full bottom-4 right-4" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <ArrowUp />
        </Button>
    );
}