import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {Link} from 'react-router-dom';
import './breadcrum.css'


function Breadcrums() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item as={Link} to='/'>Home</Breadcrumb.Item>
      <Breadcrumb.Item as={Link} to='/shop'>
        Library
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default Breadcrums;