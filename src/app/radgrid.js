/*import React, { Component } from 'react'
//import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { GridPDFExport } from '@progress/kendo-react-pdf';
//import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
//import { GridPDFExport } from '@progress/kendo-react-pdf';

export class RadGrid extends Component {
  render() {
    console.log(this.props.gridData);
    return (
        
            <Grid 
              style={{ height: '505px', width: "60%", paddingLeft: "15px" }}
              data={this.props.gridData}
              >
              <GridPDFExport
                ref={pdfExport => this.props.gridPDFExport = pdfExport}>
              </GridPDFExport>
              <GridToolbar>
                  <button
                      title="Exportar a PDF"
                      className="k-button k-primary"
                      onClick={this.props.exportPDF}
                      disabled={this.props.exporting}
                  >
                      Exportar a PDF
                  </button>
              </GridToolbar>

              <Column field="itemDescription" title="Producto"  />
              <Column field="BasePrice" title="Precio Base" format="{0:n2}" />
              <Column field="SalePrice" title="Precio con Iva"  format="{0:n2}" />
              <Column field="BasePriceUsd" title="Dolares Base" format="{0:n2}" />
              <Column field="SalesPriceUsd" title="Dolares con Iva" format="{0:n2}" />
            </Grid>
      
    )
  }
}

export default RadGrid
*/