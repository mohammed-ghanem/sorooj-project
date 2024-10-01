import FirstNav from "./FirstNav"
import LastNav from "./LastNav"
import LogoNav from "./LogoNav"



const Header = ({ language }: any) => {
  const headerNavLink = language
  return (
    <header >
      <FirstNav />
      <LogoNav language={headerNavLink }/>
      <LastNav language={headerNavLink } />
    </header>
  )
}

export default Header