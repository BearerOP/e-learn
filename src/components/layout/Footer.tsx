"use client"

export default function Footer() {
  return (
    <footer className="bg-background py-6 px-4 border-t">
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} CodeIT. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
