import React from 'react';
// import ReactDOM from 'react-dom';
import { Col,Row,Container } from 'react-bootstrap';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { GridPDFExport } from '@progress/kendo-react-pdf';

// import { orderBy } from "@progress/kendo-data-query";
//
import Common from './common';

// React hooks no, esto es clases
// const initialSort = [
// {
//     field: "itemDescription",
//     dir: "asc",
// },
// ];

// const [sort, setSort] = React.useState(initialSort);

class App extends React.Component {
    gridPDFExport;

    

    state = {
        gridData: [],
        exporting: false,
        pdfReportArray : "",
        // sort: [
        //     {
        //         field: "itemDescription",
        //         dir: "asc",
        //     },
        // ],
    }
 
    componentDidMount(){
        Common.doServerMethod$("GetSalesPricesWithForeingCurrency", null, "InventoryModule/InventoryWebMethods.aspx")
        .subscribe(
            values=>{ this.setState({ "gridData": values})},
            error=> console.error(error)
        );
        //
        /*
        Common.doServerMethod$("METODOANA", {}, "ruta/ruta.aspx")
        .subscribe(
            data => {
                debugger;
                let arraybuf = ComvertBase64ToArrayBuffer(data);
                this.setState({ "pdfReportArray": arraybuf})
            },
            error=> {
                console.error(error)
                radalert("Error trayendo WebMethod", null, null, "Lista de Precios");
            }
        );
        */
    }

    exportPDF = () => {

        if (navigator.appVersion.indexOf('Edge') > -1) {
            let file = new Blob([this.state.pdfReportArray], { type: 'application/pdf' })
            window.navigator.msSaveBlob(file, 'bancario.pdf');
            this.setState({ exporting: true });
        } else {
            let file = new Blob([this.state.pdfReportArray], { type: 'application/pdf' });
            let fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({ exporting: true });
        }

        //this.gridPDFExport.save(this.state.pdfReportArray, this.pdfExportDone);

        //this.setState({ exporting: true });
    }

    pdfExportDone = () => {
        this.setState({ exporting: false });
    }

    //metodo main
    render() {
        if (!Common.IsDesignMode()){

        const grid = (
            
            // grid old 
            <Grid data={this.state.gridData}>
            

                {/* <GridToolbar>
                    <button
                        title="Descargar a PDF"
                        className="k-button k-primary"
                        onClick={this.exportPDF}
                        disabled={this.state.exporting}
                    >
                        Descargar a PDF
                    </button>
                </GridToolbar> */}

                {/* <Column field="itemCode" title="Code" /> */}
                <Column field="itemDescription" title="Producto" />
                <Column field="BasePrice" title="Precio Base" format="{0:n2}" />
                <Column field="SalePrice" title="Precio con Iva"  format="{0:n2}" />
                {/* <Column field="DigitalSalePrice" title="Precio Bs Digital"  format="{0:n2}" /> */}
                <Column field="BasePriceUsd" title="Dolares Base" format="{0:n8}" />
                <Column field="SalesPriceUsd" title="Dolares con Iva" format="{0:n2}" />

            </Grid>
        );

        return (
        <Container>
            <Row>
                <Col md={12} style={{textAlign: "center", marginBottom: '10px'}}>
                    <h2>
                        <strong>
                        Lista de precios con IVA en Moneda Local y Extranjera vigentes a partir de 
                        { (this.state.gridData && this.state.gridData.length != 0) ? 
                        Common.convertDate(this.state.gridData[0].datEffectiveDate) : "*//*" 
                        }
                        </strong>
                    </h2>
                    <h2>
                        &Uacute;ltima tasa: 
                        {(this.state.gridData && this.state.gridData.length != 0) ? 
                        Common.convertDate(this.state.gridData[0].DatLastExchange) : "*//*" 
                        }
                        &nbsp;Valor:&nbsp;
                        {(this.state.gridData && this.state.gridData.length != 0) ? 
                        this.state.gridData[0].Rate : -1
                        }
                    </h2>
                </Col>
            </Row>
            <Row>
                {grid}
                <GridPDFExport ref={pdfExport => this.gridPDFExport = pdfExport}>
                {grid}
                </GridPDFExport>
            </Row>
        </Container>
        );

        } else {
            debugger;
            return (<h1>Contenido disponible solo en modo de visualización</h1>)
        }
    }
}

export default App;
