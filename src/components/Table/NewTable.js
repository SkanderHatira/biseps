import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import uuid from "react-uuid";
import { useConfig } from "../../hooks/useConfig";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "sample",
    numeric: false,
    disablePadding: false,
    label: "Sample",
  },
  {
    id: "lane",
    numeric: true,
    disablePadding: false,
    label: "Lane",
  },
  {
    id: "techrep",
    numeric: true,
    disablePadding: false,
    label: "Technical Replicate",
  },
  {
    id: "biorep",
    numeric: true,
    disablePadding: false,
    label: "Biological Replicate",
  },
  { id: "fq1", numeric: false, disablePadding: false, label: "Forward" },
  { id: "fq2", numeric: false, disablePadding: false, label: "Reverse" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all units" }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, addUnit, removeUnit } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Experimental Design{" "}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={removeUnit} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Add Unit">
        <IconButton onClick={addUnit} aria-label="add unit">
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  addUnit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function NewTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { units, setUnits } = useConfig();

  const blankUnit = {
    id: uuid(),
    sample: "",
    lane: 1,
    techrep: 1,
    biorep: 1,
    fq1: "",
    fq2: "",
  };
  const addUnit = () => {
    setUnits([...units, { ...blankUnit }]);
  };

  const removeUnit = () => {
    const updatedUnits = [...units];
    const updatedSelection = [...selected];
    console.log(updatedSelection);
    selected.map((item) => {
      updatedUnits.splice([item], 1);
      const filtered = updatedSelection.filter(function (value, index, arr) {
        return value !== item;
      });
      updatedSelection.splice(item, 1);
      setUnits(updatedUnits);
      setSelected(filtered);
    });
    console.log(units);
  };
  const handleUnitChange = (e) => {
    const updatedUnits = [...units];
    console.log(e.target.dataset.idx);
    updatedUnits[e.target.dataset.idx][e.target.id] = e.target.value;
    setUnits(updatedUnits);
  };
  const handleUnitFiles = (e) => {
    const updatedUnits = [...units];
    console.log(e.target.dataset.idx);
    updatedUnits[e.target.dataset.idx][e.target.id] = e.target.files[0].path;
    setUnits(updatedUnits);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = units.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, index) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected = [];
    console.log(index);
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (index) => selected.indexOf(index) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, units.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          removeUnit={removeUnit}
          addUnit={addUnit}
          numSelected={selected.length}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={units.length}
            />
            <TableBody>
              {units
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((unit, index) => {
                  const isItemSelected = isSelected(index);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, index)}
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>

                      <TableCell align="right">
                        {" "}
                        <InputBase
                          inputProps={{ "data-idx": index }}
                          label={`sample ${index}`}
                          type="text"
                          placeholder="Sample Name"
                          value={unit.sample}
                          required
                          onChange={handleUnitChange}
                          id="sample"
                          type="text"
                        ></InputBase>
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <InputBase
                          placeholder="Lane"
                          required
                          value={unit.lane}
                          onChange={handleUnitChange}
                          inputProps={{ "data-idx": index, min: "1" }}
                          id="lane"
                          type="number"
                        ></InputBase>
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <InputBase
                          onChange={handleUnitChange}
                          placeholder="Technical Replicate"
                          value={unit.techrep}
                          inputProps={{ "data-idx": index, min: "1" }}
                          id="techrep"
                          type="number"
                        ></InputBase>
                      </TableCell>

                      <TableCell align="right">
                        {" "}
                        <InputBase
                          onChange={handleUnitChange}
                          placeholder="Biological Replicate"
                          value={unit.biorep}
                          required
                          inputProps={{ "data-idx": index, min: "1" }}
                          id="biorep"
                          type="number"
                        ></InputBase>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          component="label"
                          color={unit.fq1 === "" ? "default" : "primary"}
                        >
                          {unit.fq1 === "" ? "Forward" : "Added"}
                          <input
                            data-idx={index}
                            type="file"
                            onChange={handleUnitFiles}
                            id="fq1"
                            name="fq1"
                            accept=".fastq , .fq , .fastq.gz , .fq.gz"
                            hidden
                          />
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          component="label"
                          color={unit.fq2 === "" ? "default" : "primary"}
                        >
                          {unit.fq2 === "" ? "Reverse" : "Added"}
                          <input
                            data-idx={index}
                            type="file"
                            onChange={handleUnitFiles}
                            id="fq2"
                            name="fq2"
                            accept=".fastq , .fq , .fastq.gz , .fq.gz"
                            hidden
                          />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={units.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
