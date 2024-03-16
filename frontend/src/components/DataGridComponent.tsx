import React, { useEffect } from 'react'
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, styled  } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsIcon from '@mui/icons-material/Directions';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import PageviewIcon from '@mui/icons-material/Pageview';

interface Props {
  DataColumn:[],
  DataRows: [],
  width?: string,
  size?: "medium" | "small",
  rowsPerPageProp?: 5 | 10 | 25 | 100,
  UpdateFunction?: (row: any) => void,
  DeleteFunction?: (row: any) => void,
  CustomComponent?: (row: any) => void,
  CustomComponentTwo?: (row: any) => void
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minHeight: 150
}));

function  DataGridComponent({ DataColumn, DataRows, size, rowsPerPageProp, width, UpdateFunction, DeleteFunction, CustomComponent, CustomComponentTwo }: Props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageProp ? rowsPerPageProp : 10);
    const [rowData, setRowData] = React.useState([]);
    const [columns, setColumnsData] = React.useState<[]>([]);

    useEffect(() => {
      setColumnsData(DataColumn);
      setRowData(DataRows);
    });

    useEffect(() => {
      setRowData(DataRows);
    },[DataRows]);

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(rowsPerPageProp ? rowsPerPageProp : 10);
      setPage(0);
    };
   
      

  return (
    <div>
  <Box
    sx={{
      p: 0,
      borderRadius: 2,
      bgcolor: 'background.default',
      gridTemplateColumns: { md: '1fr 1fr' },
      gap: 8,
    }}>
   <Item key="elevation" elevation={12}>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 1280 }}>
        <Table stickyHeader aria-label="sticky table" size={size ? size : "medium"}>
          <TableHead>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <strong>{column.label}</strong>
                </TableCell>
              ))}
              <TableCell
                  key={"Test"}
                  align={'center'}
                  style={{ minWidth: 80 }}
                >
                     <strong>Data Operations</strong>
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column: any) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                     })}
                   <TableCell  key={"OperationalComponent"} align={'center'}>
                    <Grid container>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={2}> 
                            {UpdateFunction ? <EditIcon color='primary' style={{ width: '2em' }} onClick={() => UpdateFunction(row)} />  : <div></div>} 
                        </Grid>
                        <Grid item xs={2}>
                            {DeleteFunction ? <DeleteIcon color='error' style={{ width: '2em' }} onClick={() => DeleteFunction(row)}/> : <div></div>} 
                        </Grid>
                        <Grid item xs={2} >
                            {CustomComponent ? <PageviewIcon color='info' style={{ width: '2em' }} onClick={() => CustomComponent(row)}/> : <div></div>}
                        </Grid>
                        <Grid item xs={2} >
                            {CustomComponentTwo ? <FindInPageIcon color='primary' style={{ width: '2em' }} onClick={() => CustomComponentTwo(row)}/> : <div></div>}
                        </Grid>
                        <Grid item xs={3}></Grid>
                    </Grid>
                   </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rowData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Item>
    </Box>
    </div>
  )
}

export default DataGridComponent;