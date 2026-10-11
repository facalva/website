import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata = { title: "Página no encontrada" };

export default function NotFound() {
  return (
    <div className="container-grid flex min-h-[60svh] flex-col items-center justify-center gap-6 py-20 text-center">
      <p className="text-taupe-500 tracking-eyebrow text-sm uppercase">Error 404</p>
      <h1 className="text-brand-700 text-2xl md:text-h2">Esta página no existe</h1>
      <p className="text-brand-700 max-w-[46ch] text-sm">
        Es posible que el enlace esté roto o que la página se haya movido.
      </p>
      <Button asChild size="lg" className="mt-2 px-6">
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}
