import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../index.css'

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

class HideAppBar extends Component {
    _goHome = () =>{
        console.log("CLICK LOGO");
    }

    _onSearch = ()=>{
        console.log("CLICK SEARCH BUTTON");
    };

    _signOut = ()=>{
        localStorage.clear();
        this.props.setUser(null);
        this.props.setModalOepn(false);
    }
    _openSomething = () =>{
      if(this.props.user.email==="")
        this.props.setModalOpen(true);
      else
        this.props.setModalOpen(false);
    }

    render(){
      return (
        <React.Fragment>
          <CssBaseline />
          <HideOnScroll props={this.props}>
            <AppBar>
              <Toolbar>
                <div className="row-container" float="left">
                  {/* 홈 버튼 */}
                  <Button variant="contained" color="primary" onClick={this._goHome} className="flex-1" >HYCOTT</Button>
                  {/* 검색창 */}
                  <div margin="auto">
                    <div>
                      <SearchIcon />
                      <InputBase className="flex-7" placeholder="Search contents..."></InputBase>
                    </div>
                  </div>
                  {/* 아이콘 버튼 */}
                  <div float="right">
                    <IconButton color="inherit" className="flex-7">
                      <Badge badgeContent={0} color="secondary">
                        <MailIcon />
                      </Badge>
                    </IconButton>
                    <IconButton color="inherit" className="flex-7">
                      <Badge badgeContent={0} color="secondary">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                    <IconButton edge="end" color="inherit" className="flex-7" onClick={this._openSomething}>
                      <AccountCircle />
                    </IconButton>
                  </div>
                </div>
              </Toolbar>
            </AppBar>
          </HideOnScroll>
        </React.Fragment>
      );
    }
}

const mapDispatchProps = (dispatch) => {
  return {
    setUser : (user) => { dispatch(actions.setUser(user))},
    setModalOpen : (modalOpen) => { dispatch(actions.setModalOpen(modalOpen)) }
  }
}

const mapStateToProps = (state) => {
  return {
      user : state.user,
      modalOpen : state.modalOpen
  }
}
HideAppBar = connect(mapStateToProps, mapDispatchProps)(HideAppBar); 
export default HideAppBar;