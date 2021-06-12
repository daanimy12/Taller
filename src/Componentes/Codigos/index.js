import React, {Component} from 'react';
//import { Page, Text, View, Document, StyleSheet ,PDFViewer } from '@react-pdf/renderer';
import ReactToPrint from "react-to-print";
class ComponentToPrint extends React.Component {
    state={
        Codigos:'Pedro',
        ArrayCodigos:[]
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        return null;
    }


    /* CodigosMa=()=>{
         const Co = this.props.Codigos
         if( Co === []){
             let Codi=[];
             Co.forEach(item=>{
                 Codi.push(
                     <div className="col-4">
                         <Barcode value={item}/>
                     </div>
                 );
             });
             this.setState({ArrayCodigos:Codi});
         }else{
             this.setState({ArrayCodigos:<div className="col-4">
                     <Barcode value={Co}/>
                 </div>})
         }
     }*/

    render() {
        return (
           <div className="col-12 row mt-2">
               {this.props.Codigos}
           </div>
        );
    }
}


class index extends Component {
    state={
        Codigos:'Pedro21'
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        prevState.Codigos =  nextProps.location.Codigos;
        if(prevState.Codigos === 'Pedro21' || prevState.Codigos === undefined){
            nextProps.history.push({
<<<<<<< HEAD
                pathname: "/Principal/Clientes",
=======
                pathname: "/Customers/Clientes",
>>>>>>> f2cd55581963bcbc124e2ee1622cc5a0fec16fee
            });
        }
        return null;
    }

    render() {
            return(
               <div className="col-12">
                   <ReactToPrint
                       trigger={() =>  <button className="btn btn-primary m-2 col-12"> Impimir </button> }
                       content={() => this.componentRef}
                   />
                   <ComponentToPrint ref={el => (this.componentRef = el)}
                                     Codigos={this.props.location.Codigos ? this.props.location.Codigos:this.state.Codigos} />

               </div>
        );
    }
}

export default index;

    
