import React from 'react';
import { useNotesAction } from "./contextos/contNotes";

const TvwVendors = () => {

    const { arrayVendors } = useNotesAction();

    const handleVendors = () => {
        if (arrayVendors.length === 0) {
            return null;
        } else {
            return (
                <>
                    <h1 className="titleVendor"> Provedores </h1>
                    <div className="dataGeneral"></div>
                    <div className="boxInventary" >
                        <label> Folio </label>
                        <label> Marca </label>
                        <label> Monto </label>
                    </div>
                    <div className="boxInventary" >
                        {
                            arrayVendors
                                .map(
                                    (inven) => (
                                        <div>
                                            <h2> {inven?.folio || 0} </h2>
                                            <label> {inven.name} </label>
                                            <h1> {inven?.invoiceAmount || 0} </h1>
                                        </div>
                                    )
                                )
                        }
                    </div>
                </>
            )
        }
    }
    return (
        <>
            { handleVendors()}
        </>
    )
}

export default TvwVendors;