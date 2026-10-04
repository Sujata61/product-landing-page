"use client";
import { useRouter } from "next/navigation";
import { product } from "@/lib/product";
export function OrderButton({ quantity = 1, children, className = "button-primary" }: { quantity?: number; children: React.ReactNode; className?: string }) { const router = useRouter(); return <button onClick={() => router.push(`/checkout?quantity=${quantity}&price=${product.price}`)} className={className}>{children}</button>; }
