interface RootLayoutProps {
  children: React.ReactNode
}

export default function CredentialLayout({ children }: RootLayoutProps) {
  return (
    <div>
      Credential Layout
      <div>{children}</div>
    </div>
  )
}
