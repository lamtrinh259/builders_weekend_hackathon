interface RootLayoutProps {
  children: React.ReactNode
}

export default function CredentialLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex">
      <div className="w-48 shrink-0">Credential Layout</div>
      <div className="flex h-full items-center bg-grey-800">{children}</div>
    </div>
  )
}
