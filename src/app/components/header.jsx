import { Avatar, Button, Container } from "@mui/material";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  return (
    <Container className="container">
      <div className="nav-brand">
        {/* <MenuIcon className="hamburger-icon" /> */}
        <div className="logo">
          <h4>LOGO</h4>
        </div>
      </div>
      <div className="nav-items">
        <Button disableElevation className="nav-btn" variant="contained">
          Feedback
        </Button>
        <Image alt="nav-icons" src={"/assets/Bell.svg"} width={24} height={24} />
        <Image alt="nav-icons" src={"/assets/InfoCircle.svg"} width={24} height={24} />
        <Avatar className="avatar" alt="nav-avatar" />
        <Image alt="nav-icons" src={"/assets/dropdownicon.svg"} width={10} height={10} />
      </div>
    </Container>
  );
}

export default Header;
