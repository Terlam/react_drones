import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
  } from '@mui/material';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { DroneForm } from '../../components';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width:190 },
  {
    field: 'name',
    headerName: 'Drone Name',
    width: 150,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 150,
    editable: true,
  },
  {
    field: 'camera_quality',
    headerName: 'Camera Quality',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    description: 'A description of the drone.',
    sortable: false,
    width: 160,
  },
];

interface gridData extends GridSelectionModel {
  data:{
    name: string,
    price: string,
    description: string,
    camera_quality: string,
    flight_time: string,
    max_speed: string,
    dimensions: string,
    weight: string,
    cost_of_production: number,
    series: string
    id: string
  }
}

export const DataTable = () =>{
    let { droneData, getData } = useGetData();
    let [ open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () => {
      setOpen(true);
    }
    let handleClose = () => {
      setOpen(false);
    }

    let deleteData = async () =>{
      let item:any;
      for ( item in gridData){
        console.log(item);
        await server_calls.delete(`${item.data.id}`)
      }
      window.location.reload()
      console.log(item.data)
    }
    console.log(gridData)
    console.log(Object.keys(gridData[0]))
  return (
    <div style={{ height: 400, width: '100%' }}>

      <DataGrid
        rows={droneData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        {...droneData}
        // onSelectionModelChange={ (newSelectionModel) => {setData(newSelectionModel);}}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = droneData.filter((row:any) =>
            selectedIDs.has(row.id.toString())
          );
           setData(selectedRowData);
        }}
      />
      <Button onClick={handleOpen}>Update Drone</Button>
      <Button variant='contained' color='secondary' onClick={deleteData}>Delete Drone</Button>
      {/* Dialog Pop up here */}
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id="form-dialog-title">Update A Drone </DialogTitle>
        <DialogContent>
          <DialogContentText>Drone id: {gridData}</DialogContentText>
          <DroneForm id={ `${gridData}`} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
