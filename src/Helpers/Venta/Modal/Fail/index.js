import React, {Component} from 'react';

class index extends Component {

    render() {

        return (
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                <div className="item_border_fail">
                    <h5 className="name_product">Ups..</h5>
                    <div className="item">
                        <img src="https://static.thenounproject.com/png/1400397-200.png" alt="Lupa" className="fail_image"/>
                    </div>
                    <h5 className="price_product">No se encontro lo que buscas</h5>
                </div>

            </div>
        );
    }
}

export default index;
