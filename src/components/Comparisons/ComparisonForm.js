import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles, useTheme } from "@material-ui/core/styles";
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
import { useConfig } from "../../hooks/useConfig";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useAuth } from "../../hooks/useAuth";

const path = require("path");
const fs = require("fs");
const http = require("http");
const homedir = require("os").homedir();
const bisepsTemp = path.join(homedir, ".bisepsTemp/");

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "69%",
    },
  },
};
const fileExist = (path) => {
  try {
    if (fs.existsSync(path)) {
      return true;
    }
  } catch (err) {
    return false;
  }
};
const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Comparison Label",
  },
  {
    id: "control",
    numeric: false,
    disablePadding: false,
    label: "Control",
  },
  {
    id: "treatment",
    numeric: false,
    disablePadding: false,
    label: "Treatment",
  },
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
            inputProps={{ "aria-label": "select all comparisons" }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
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
  const { numSelected, addUnit, removeComparison } = props;

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
          Control and Treatment Pairs{" "}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={removeComparison} aria-label="delete">
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
        <IconButton onClick={addUnit} aria-label="add comparison">
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
    maxWidth: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: "100%",
    maxWidth: "100%",
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

export default function ComparisonForm() {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {
    comparisons,
    setComparisons,
    remotecomparisons,
    setRemoteComparisons,
    compState,
  } = useConfig();
  const { user } = useAuth();

  const [data, setData] = useState([]);
  const theme = useTheme();
  const handleLabelChange = (e) => {
    if (compState.remote) {
      const updatedRemoteComparisons = [...remotecomparisons];
      console.log(e.target.dataset.idx);
      updatedRemoteComparisons[e.target.dataset.idx][e.target.id] =
        e.target.value;
      setRemoteComparisons(updatedRemoteComparisons);
    }
    const updatedUnits = [...comparisons];
    console.log(e.target.dataset.idx);
    updatedUnits[e.target.dataset.idx][e.target.id] = e.target.value;
    setComparisons(updatedUnits);
  };

  const handleSelectChange = (e, index) => {
    console.log(e.target.value);
    const newFiles = [];
    for (const file in e.target.value) {
      newFiles.push(path.join("data/", path.basename(e.target.value[file])));

      console.log(e.target.value);
      console.log(newFiles);
      const updatedRemoteComparisons = [...remotecomparisons];
      updatedRemoteComparisons[index][e.target.name + "s"] = newFiles;
      updatedRemoteComparisons[index][e.target.name] = newFiles.join(",");
      setRemoteComparisons(updatedRemoteComparisons);
    }
    const updatedUnits = [...comparisons];
    updatedUnits[index][e.target.name + "s"] = e.target.value;
    updatedUnits[index][e.target.name] = e.target.value.join();
    setComparisons(updatedUnits);
  };
  useEffect(() => {
    console.log(user.user.id);
    const fetchData = async () => {
      const token = sessionStorage.jwtToken;
      const Sock = await sessionStorage.Sock;
      const options = {
        method: "GET",
        path: `http://localhost/api/runs/${user.user.id}`,
        socketPath: Sock,
        port: null,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const req = http.get(options, function (res) {
        console.log("STATUS: " + res.statusCode);
        console.log("HEADERS: " + JSON.stringify(res.headers));
        // Buffer the body entirely for processing as a whole.
        const bodyChunks = [];
        res
          .on("data", function (chunk) {
            // You can process streamed parts here...
            bodyChunks.push(chunk);
          })
          .on("end", function () {
            const body = Buffer.concat(bodyChunks);
            const jsbody = JSON.parse(body);
            setData(jsbody);
          });
      });
      req.on("error", function (e) {
        console.log("ERROR: " + e.message);
      });
    };

    fetchData();
  }, []);
  let result = [];
  data.map((row) => {
    row.samples.map((sample) => {
      if (row.remote) {
        result.push(
          `${bisepsTemp}${sample.samplePath}.deduplicated.CX_report.txt`
        );
      } else {
        result.push(
          `${row.outdir}/results/${sample.samplePath}/methylation_extraction_bismark/${sample.samplePath}.deduplicated.CX_report.txt`
        );
      }
    });
  });

  const blankUnit = {
    id: "",
    controls: [],
    treatments: [],
    control: "",
    treatment: "",
  };
  const [checked, setChecked] = useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const addUnit = () => {
    setRemoteComparisons([...remotecomparisons, { ...blankUnit }]);

    setComparisons([...comparisons, { ...blankUnit }]);
  };
  console.log(remotecomparisons);
  const removeComparison = () => {
    const remoteUpdated = [...remotecomparisons];
    const RemoteUpdatedSelected = [...selected];
    const remoteSorted = RemoteUpdatedSelected.sort((a, b) => a - b);
    while (remoteSorted.length) {
      console.log(remoteSorted);

      remoteUpdated.splice(remoteSorted.pop(), 1);
    }
    setRemoteComparisons(remoteUpdated);

    const updatedComparisons = [...comparisons];
    const updatedSelected = [...selected];
    const sorted = updatedSelected.sort((a, b) => a - b);
    while (sorted.length) {
      console.log(sorted);

      updatedComparisons.splice(sorted.pop(), 1);
    }
    setComparisons(updatedComparisons);
    setSelected([]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = comparisons.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const [errors, setErrors] = useState();

  function validate(comparison) {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if (comparison.id.length === 0) {
      errors.push(
        "You need to enter a unique ID for this comparison example 'Control_VS_Treatment'"
      );
    }

    return errors;
  }
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
    rowsPerPage -
    Math.min(rowsPerPage, comparisons.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          removeComparison={removeComparison}
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
              rowCount={comparisons.length}
            />
            <TableBody>
              {comparisons
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((comparison, index) => {
                  const isItemSelected = isSelected(index);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  console.log(index);
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
                      <TableCell>
                        <FormControl className={classes.formControl}>
                          <Input
                            onChange={handleLabelChange}
                            value={comparison.id}
                            // error={comparison.id.length === 0}
                            placeholder="Label"
                            required
                            inputProps={{ "data-idx": index }}
                            id="id"
                            type="text"
                          ></Input>
                        </FormControl>
                      </TableCell>

                      <TableCell>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="demo-mutiple-checkbox-label">
                            Control
                          </InputLabel>
                          <Select
                            labelId="demo-mutiple-checkbox-label"
                            name="control"
                            multiple
                            // error={comparison.controls.length === 0}
                            value={comparison.controls}
                            onChange={(event) =>
                              handleSelectChange(event, index)
                            }
                            input={<Input />}
                            renderValue={(selected) =>
                              selected.join(", ").length > 25
                                ? selected.join(", ").substring(0, 25) + "..."
                                : selected.join(", ")
                            }
                          >
                            {result.map((res) => (
                              <MenuItem
                                disabled={fileExist(res) ? false : true}
                                key={res}
                                value={res}
                              >
                                <Checkbox
                                  checked={
                                    comparison.controls.indexOf(res) > -1
                                  }
                                />
                                <ListItemText primary={path.parse(res).name} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="demo-mutiple-checkbox-label">
                            Treatment
                          </InputLabel>
                          <Select
                            inputProps={{ "data-idx": index }}
                            labelId="demo-mutiple-checkbox-label"
                            // error={comparison.treatments.length === 0}
                            name="treatment"
                            multiple
                            value={comparison.treatments}
                            onChange={(event) =>
                              handleSelectChange(event, index)
                            }
                            input={<Input />}
                            renderValue={(selected) =>
                              selected.join(", ").length > 25
                                ? selected.join(", ").substring(0, 25) + "..."
                                : selected.join(", ")
                            }

                            // renderValue={(selected) => "Modify Treatment Input"}
                          >
                            {result.map((name) => (
                              <MenuItem
                                disabled={fileExist(name) ? false : true}
                                key={name}
                                value={name}
                              >
                                <Checkbox
                                  checked={
                                    comparison.treatments.indexOf(name) > -1
                                  }
                                />
                                <ListItemText primary={path.parse(name).name} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
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
          count={comparisons.length}
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
