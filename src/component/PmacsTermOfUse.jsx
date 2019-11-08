import React, { Component } from 'react';
import bootstrap from 'bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const divStyleBox = {
    width: "50%",
};

class PmacsTermOfUse extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div className="container" >
                <h2 className="font_2">Termo de Uso da plataforma MACS</h2>

                <textarea class="form-control" id="exampleFormControlTextarea1" rows="20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                anim id est laborum.
                
                Ut porttitor leo a diam sollicitudin tempor id eu. Pellentesque nec nam aliquam sem et 
                tortor consequat id. Augue eget arcu dictum varius duis at consectetur lorem donec. Amet 
                facilisis magna etiam tempor orci eu lobortis elementum nibh. Rhoncus urna neque viverra 
                justo nec ultrices dui sapien eget. Venenatis a condimentum vitae sapien pellentesque. 
                Tellus cras adipiscing enim eu turpis egestas pretium aenean. Cursus vitae congue mauris 
                rhoncus aenean vel. Est lorem ipsum dolor sit amet consectetur adipiscing. In fermentum 
                posuere urna nec tincidunt praesent. Commodo viverra maecenas accumsan lacus vel facilisis 
                volutpat. Eu consequat ac felis donec et odio. Enim nulla aliquet porttitor lacus luctus 
                accumsan tortor. Malesuada proin libero nunc consequat interdum varius sit. Et tortor at 
                risus viverra adipiscing at in. Sollicitudin aliquam ultrices sagittis orci a. Sapien et 
                ligula ullamcorper malesuada proin libero nunc. Eu facilisis sed odio morbi quis commodo 
                odio aenean.
                </textarea>
            </div>
        )
    }
}

export default PmacsTermOfUse