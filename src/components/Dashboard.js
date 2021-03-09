import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import parallaxlayer from  "./../img/parallax_photo.png";
import cookie from "./../img/cookie.svg";
import jayanagar from  "./../img/jayanagar.jpg";
import yelahankarailway from  "./../img/railway.jpg";
import madrasroad from  "./../img/road.jpg";
import communities from "./../img/communities.jpg"; 
import scotlandview from "./../img/scotlandview.jpg";
import view from "./../img/view.jpg";
import map from "./../img/map.jpg";
import picture from "./../img/picture.jpg";
import cycling from "./../img/cycling.jpg";
import brand from "./../img/brand.svg";
import { FaArrowRight,FaFacebook,FaTwitter,FaInstagram,FaYoutube,FaSearch,FaBars,FaWindowClose} from 'react-icons/fa';
                    
// import family from  "./../img/family.png";
class Firsttest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zoomIn: false,
            corouselImages: [communities, scotlandview, view, map, picture],
            alert:false,
        }
    }

    changeImageSequence(index) {
        console.log(index);
        const { corouselImages } = this.state;
        const imageUrl = corouselImages.splice(index, 1);
        corouselImages.push(imageUrl);
        this.setState({corouselImages})
    }

    toggleAlert = () => {
        const { alert } = this.state;
        this.setState({
            alert: !alert,
        })
    }
    
 render() {
    const { zoomIn, corouselImages,alert } = this.state;
        return (
            <div>
            
                <div className="parallax-section">
                  <img className= "layer" src={parallaxlayer} alt="parallax" onClick={ this.toggleAlert}  />
                  {alert && <div className="makealert">
                             <img src= {cookie} alt ="cookie" className="cookieimg" width= "68px" height= "68px"/>
                               <div className="alertmsgs">
                                    <span className="alertmsg alertmsgone">WE USE COOKIES TO IMPROVE YOUR BROWSING EXPERIENCE</span>
                                    <div className="alertmsg alertmsgtwo">Find out more about cookie policy here <span className="closeicon"><FaWindowClose /></span></div>
                               </div>
                            </div>}
                   <div className="brandicon">
                        <img src={brand} alt="brand" className="brandcolor" /> 
                        <span>Banglore Walks</span>   
                    </div> 
                  <div className="faicons">          
                    <FaSearch className="searchicon" />
                    <FaBars className="menuicon" />
                  </div>  
                  <div className="textonimage">
                    <h2 className="header">Building streets for peoples</h2>
                    <p className="increasize">There thousands of ideas for how we can make our city more livable. We're helping the government realize a better city, one steet at a time.</p>
                  </div>
                  </div>
                  <div className="dashboardbgcolor">
                  <p className="mt-4 ongoing-projects-title">Ongoing projects</p>
                   <div className={`ongoing-images-container ${zoomIn ? 'zoomin' : 'zoomout'}`} onClick={() => this.setState({zoomIn: !zoomIn})}>
                    <div className="ongoing-images mr-3">
                      <img className= "firstimage" src={jayanagar} alt="jayanagar" />
                      <p className="jayanagar">JAYANAGAR</p>
                    </div>
                    <div className="ongoing-images">
                        <img src={yelahankarailway} alt="yelahanka" />
                        <p className="yelahankarailway">YELAHANKA</p>
                        <img className= "pt-3" src={madrasroad} alt="madrasroad" />
                        <p className="madrasroad">OLD MADRAS ROAD</p>

                    </div>
                  </div>
                  <div className="corousel-container mb-4">
                    <div className="corousel-images-container">
                        {corouselImages.map((imgUrl, index) =>{
                            return  <img className={`corousel-image img-${index}`} src={imgUrl} alt={imgUrl} />
                        })}
                    </div>
                    <ul className="themes">
                        <li onClick={()=> this.changeImageSequence(0)}>Geography</li>
                        <li onClick={()=> this.changeImageSequence(1)}>communities</li>
                        <li onClick={()=> this.changeImageSequence(2)}>Infrastruture</li>
                        <li onClick={()=> this.changeImageSequence(3)}>Housing</li>
                        <li onClick={()=> this.changeImageSequence(4)}>Pollution</li>
                    </ul>
                  </div>
                  <div className="mt-4 final-image">
                  <div className="some-text">
                      <p className="font-size">Work with us</p>
                      <h2>We're on the lookout for people like you.</h2>
                      <p className="mt-4 font-size colorchange">Tell us more about you <FaArrowRight /></p>
                      
                  </div>
                  <span>
                       <img className="cyling-image" src={cycling} alt="cycling" />
                  </span>
                  </div>
                  </div>
                  <div className="dashboardborder">
                  <div className="mt-2 footer">
                     <div className="mt-4">
                         <p className="ml-4 BangloreWalks">Banglore Walks is an city planning think tank that engages with local stakeholders to create humane public spaces</p>
                     </div>
                     
                         <div className="fluid">
                             <div className="mt-4 news">
                                 <p className= "footersize">NEWS</p>
                                 <p className="months">JAN 29</p>
                                 <p className="underline">Comprensive mobility plan updates from the BBMP and KRDCL show the new layout for the metro </p>
                                 <p className="months">JAN 12</p>
                                 <p className="underline">Is it time file another PIL for the Kanakpura road widening project</p>
                             </div>
                             <div className="eventmove">
                             <div className="mt-4 events">
                                 <p className= "footersize">EVENTS</p>
                                 <p className="months">FEB 7</p>
                                 <p className="underline">Handlebar survey, SG Palya </p>
                                 <p className="months">FEB 17</p>
                                 <p className="underline">Walking aduit, Ward 57</p>
                                 <p className="months">MAR 1</p>
                                 <p className="underline">cycle day</p>
                             </div>
                             </div>

                         </div>
                     </div>
                     <hr className="new5" />
                     <div className="ml-4 footerdistance">
                        <div> 
                        <img src={brand} alt="brand" /> 
                        <span className="brand">Banglore Walks</span>   
                        </div>                
                        
                        <span className="socialfollow">
                                <FaFacebook  className="socialapps"/>
                                <FaTwitter   className="socialapps"/>
                                <FaInstagram className="socialapps"/>
                                <FaYoutube   className="socialapps"/>
                        </span>
                     </div>
                     
               </div>
            </div>
        );
    }
}

export default Firsttest;






                          
          
                                
                                 
            




       
           
                 
                  
                        
                          
                    
                         
                      
                      
                   

                           
                    
                    
                    
                       
                          
                    
                       
                 
                        
                     
                
                    
                    
                    
                    
                    
        
                    
                    
            
                    