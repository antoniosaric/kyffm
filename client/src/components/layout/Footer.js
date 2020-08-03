import React, { Fragment} from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <Fragment>
        <footer className="footer mt-auto py-3 font-small bg-primary mt-2">
    
        <div className="container text-center text-md-left mt-5">
      
          <div className="row mt-3">

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
      
              <h6 className="text-uppercase font-weight-bold">Support</h6>
              <p>
                <Link to="">Help</Link>
              </p>
              <p>
                <Link to="">Contact</Link>
              </p>
              <p>
                <Link to="">Terms and Conditions</Link>
              </p>
              <p>
                <Link to="">Privacy Policy</Link>
              </p>
      
            </div>
    
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
    
                  <h6 className="text-uppercase font-weight-bold">Company</h6>
                <p>
                  <Link to="">About</Link>
                </p>
                <p>
                  <Link to="">File Complaint</Link>
                </p>
                <p>
                  <Link to="">Careers</Link>
                </p>
                <p>
                  <Link to="">Press</Link>
                </p>
        
              </div>
        
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
      
              <h6 className="text-uppercase font-weight-bold">Contact</h6>
              <p>
                <i className="fa fa-home mr-3"></i> San Francisco, CA, US</p>
              <p>
                <i className="fa fa-envelope mr-3"></i> info@KYFFM.com</p>
              <p>
                <i className="fa fa-phone mr-3"></i> + 01 234 567 88</p>
              <p>
                <i className="fa fa-print mr-3"></i> + 01 234 567 89</p>
      
            </div>
      
          </div>
      
        </div>
        <hr />
        <div className="footer-copyright text-center py-3">© 2020 Copyright: KYFFM.com</div>
      
      </footer>
      </Fragment>
    )
}

export default Footer
