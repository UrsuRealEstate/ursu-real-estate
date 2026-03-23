import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'URSU Real Estate',
  description: 'Luxury Properties in Italy',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
