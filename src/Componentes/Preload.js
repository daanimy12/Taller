import React, {Component} from 'react';
import '../css/Ventas.css'

class Preload extends Component {

    state = {
    }

    render() {

        return (
            <div style={{width: '100%', alignItems: 'center', display: 'grid'}}>
                <div className="dice">

                    <div className="face first-face">
                        <div className="dot"></div>
                    </div>

                    <div className="face second-face">
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>

                    <div className="face third-face">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>

                    <div className="face fourth-face">
                        <div className="column">
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                        <div className="column">
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    </div>

                </div>


                <p>Wait, please...</p>
            </div>
        );
    }
}

export default Preload;
