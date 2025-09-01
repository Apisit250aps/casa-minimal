import React from 'react'
import Image from 'next/image'

export interface AppLogoProps {
  size?: number
}

function AppLogo({ size = 36 }: AppLogoProps) {
  return (
    <Image
      src={'/assets/casa/logo/casa-minimal.png'}
      alt="Casa Minimal Logo"
      width={size}
      height={size}
    />
  )
}

export default AppLogo
