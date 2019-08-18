import React, {Component} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import SignBox from './SignBox';
import PropTypes from 'prop-types';

class TopBar extends Component {
  state = {
    modalOn: false
  }

  static propTypes ={
    isSignIn: PropTypes.bool.isRequired,
  }
  
  _click = () =>{
    this.props.isSignIn ? this.SignIn() : this._modalToggle()
  }

  _signIn = () =>{
    console.log("sign in")
  }

  _modalToggle = () =>{
    this.setState({
      modalOn: true //!this.state.modalOn
    })
  }
  
  render(){
    return(
      <div>
        <div className="top-container">
          <AppBar position="static">
            <Toolbar>
                <IconButton edge="end" aria-label="account of current user" aria-haspopup="true"
                onClick={this._click} color="inherit"
                ><AccountCircle/>
                
                </IconButton>
              <SearchIcon /><InputBase placeholder="Search contents..."></InputBase>
              <Typography>HYCOTT</Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          {this.state.modalOn && <div><SignBox /></div>}
          {/* {this._modalToggle()} */}
        </div>
      </div>      
    //   <div className="top-container">
    //   <AppBar position="static">
    //     <Toolbar>
    //           <div>
    //             <IconButton
    //             edge="end"
    //             aria-label="account of current user"
    //             // aria-controls={menuId}
    //             aria-haspopup="true"
    //             onClick= {this.props.isSignIn ? console.log("sign in") : <SignBox/>}
    //             color="inherit"
    //             >
    //             <AccountCircle />
    //             </IconButton>
    //             {/* <IconButton aria-label="show 4 new mails" color="inherit">
    //             <Badge badgeContent={4} color="secondary">
    //                 <MailIcon />
    //             </Badge>
    //             </IconButton>
    //             <IconButton aria-label="show 17 new notifications" color="inherit">
    //             <Badge badgeContent={17} color="secondary">
    //                 <NotificationsIcon />
    //             </Badge>
    //             </IconButton> */}
    //         </div>
    //         <div>
    //             <SearchIcon />
    //             </div>
    //             <InputBase
    //             placeholder="Search…"
    //             classes={{
    //                 root: this.state.classes.inputRoot,
    //                 input: this.state.classes.inputInput,
    //             }}
    //             inputProps={{ 'aria-label': 'search' }}
    //             />
    //         </div>

    //         <Typography className={this.state.classes.title} variant="h6" noWrap> HYCOTT </Typography>
          
    //         <div>
    //             <IconButton
    //             aria-label="show more"
    //             // aria-controls={mobileMenuId}
    //             aria-haspopup="true"
    //             // onClick={handleMobileMenuOpen}
    //             color="inherit"
    //             >
    //             <MoreIcon />
    //             </IconButton>
    //         </div>
    //         </Toolbar>
    //     </AppBar>
    //   {/* {renderMobileMenu}
    //   {renderMenu} */}
    // </div>
    )
  }
}

export default TopBar;

// export default function PrimarySearchAppBar(isSignIn) {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

//   const isMenuOpen = Boolean(anchorEl);
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//   function handleProfileMenuOpen(event) {
//     setAnchorEl(event.currentTarget);
//   }

//   function handleMobileMenuClose() {
//     setMobileMoreAnchorEl(null);
//   }

//   function handleMenuClose() {
//     setAnchorEl(null);
//     handleMobileMenuClose();
//   }

//   function handleMobileMenuOpen(event) {
//     setMobileMoreAnchorEl(event.currentTarget);
//   }

//   const menuId = 'primary-search-account-menu';
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//       <MenuItem onClick={handleMenuClose}>My account</MenuItem>
//     </Menu>
//   );

//   const mobileMenuId = 'primary-search-account-menu-mobile';
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       <MenuItem>
//         <IconButton aria-label="show 4 new mails" color="inherit">
//           <Badge badgeContent={4} color="secondary">
//             <MailIcon />
//           </Badge>
//         </IconButton>
//         <p>Messages</p>
//       </MenuItem>
//       <MenuItem>
//         <IconButton aria-label="show 11 new notifications" color="inherit">
//           <Badge badgeContent={11} color="secondary">
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>
//         <p>Notifications</p>
//       </MenuItem>
//       <MenuItem onClick={handleProfileMenuOpen}>
//         <IconButton
//           aria-label="account of current user"
//           aria-controls="primary-search-account-menu"
//           aria-haspopup="true"
//           color="inherit"
//         >
//           <AccountCircle />
//         </IconButton>
//         <p>Profile</p>
//       </MenuItem>
//     </Menu>
//   );

//   return (
//     <div className={classes.grow}>
//       <AppBar position="static">
//         <Toolbar>
//             <div className={classes.grow} />
//             <div className={classes.sectionDesktop}>
//                 <IconButton
//                 edge="end"
//                 aria-label="account of current user"
//                 aria-controls={menuId}
//                 aria-haspopup="true"
//                 onClick= { isSignIn ? {handleProfileMenuOpen} : <SignBox/>}
//                 color="inherit"
//                 >
//                 <AccountCircle />
//                 </IconButton>
//                 {/* <IconButton aria-label="show 4 new mails" color="inherit">
//                 <Badge badgeContent={4} color="secondary">
//                     <MailIcon />
//                 </Badge>
//                 </IconButton>
//                 <IconButton aria-label="show 17 new notifications" color="inherit">
//                 <Badge badgeContent={17} color="secondary">
//                     <NotificationsIcon />
//                 </Badge>
//                 </IconButton> */}
//             </div>
          
//             <div className={classes.search}>
//                 <div className={classes.searchIcon}>
//                 <SearchIcon />
//                 </div>
//                 <InputBase
//                 placeholder="Search…"
//                 classes={{
//                     root: classes.inputRoot,
//                     input: classes.inputInput,
//                 }}
//                 inputProps={{ 'aria-label': 'search' }}
//                 />
//             </div>

//             <Typography className={classes.title} variant="h6" noWrap> HYCOTT </Typography>
          
//             <div className={classes.sectionMobile}>
//                 <IconButton
//                 aria-label="show more"
//                 aria-controls={mobileMenuId}
//                 aria-haspopup="true"
//                 onClick={handleMobileMenuOpen}
//                 color="inherit"
//                 >
//                 <MoreIcon />
//                 </IconButton>
//             </div>
//             </Toolbar>
//         </AppBar>
//       {renderMobileMenu}
//       {renderMenu}
//     </div>
//   );
// }