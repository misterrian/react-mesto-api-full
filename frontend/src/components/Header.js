import logo from "../images/logo.svg";

function Header({children}) {
    return (
        <header className="header">
            <img src={logo} alt="Логотип" className="header__logo"/>
            <div className="header__auth">
                {children}
            </div>
        </header>
    );
}

export default Header;
