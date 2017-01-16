import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from  'react-router';

//material-ui
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui/svg-icons/action/home';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


const iconStyles = {
  color: 'white',
};

const LogMenu = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem><Link to="/signin">Sign In</Link></MenuItem>
    <MenuItem><Link to="/signup">Sign Up</Link></MenuItem>
  </IconMenu>
);

class Header extends Component {

  render() {
    return (
      <AppBar
       title="Demo App"
       iconElementLeft={<IconButton><Link to="/"><HomeIcon style={iconStyles}/></Link></IconButton>}
       iconElementRight={
         this.props.authenticated
         ? <Link className="nav-link" to="/signout"><FlatButton label="Sign Out" /></Link>
         : <LogMenu /> }
       />
    );
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
