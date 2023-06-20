/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

import styled from "./styles.module.scss";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaCaretUp /> : <FaCaretDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row._id}
        </TableCell>
        <TableCell align="left">
          {row.paymentMethod == "paypal"
            ? "Paypal"
            : row.paymentMethod == "credit_card"
            ? "Credit card"
            : "Cash on delivery"}
        </TableCell>
        <TableCell align="right">
          {row.isPaid ? (
            <div className={styled.table__ver}>
              <img src="/images/verified.png" alt="" /> Paid
            </div>
          ) : (
            <div className={styled.table__unver}>
              <img src="/images/unverified.png" alt="" /> Unpaid
            </div>
          )}
        </TableCell>
        <TableCell align="left">{row.status}</TableCell>
        <TableCell align="left">{row.couponApplied || "-"}</TableCell>
        <TableCell align="left">${row.total}</TableCell>
      </TableRow>

      <TableRow className="smallTable">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#666",
                  fontWeight: 600,
                  marginTop: "1rem",
                  fontFamily: "Poppins",
                }}
                gutterBottom
                component="div"
              >
                Order for
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Full name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="left">Shipping infos</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.user._id}>
                    <TableCell component="th" scope="row">
                      <img
                        src={row.user.image}
                        className={styled.table__img}
                        alt=""
                      />
                    </TableCell>
                    <TableCell>{row.user.name}</TableCell>
                    <TableCell align="left">{row.user.email}</TableCell>
                    <TableCell align="left" className={styled.table__infos}>
                      <p>
                        <span>Name:</span>&nbsp;
                        {row.shippingAddress.firstName}&nbsp;
                        {row.shippingAddress.lastName}
                      </p>
                      <p>
                        <span>Address:</span>&nbsp;
                        {row.shippingAddress.address1}
                      </p>
                      <p>
                        <span>State_City:</span>&nbsp;
                        {row.shippingAddress.state}, {row.shippingAddress.city}
                      </p>
                      <p>
                        <span>Country:</span>&nbsp;{row.shippingAddress.country}
                      </p>
                      <p>
                        <span>Postal code:</span>&nbsp;
                        {row.shippingAddress.zipCode}
                      </p>
                      <p>
                        <span>Phone:</span>&nbsp;
                        {row.shippingAddress.phoneNumber}
                      </p>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <TableRow className="smallTable">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#666",
                  fontWeight: 600,
                  marginTop: "1rem",
                  fontFamily: "Poppins",
                }}
                gutterBottom
                component="div"
              >
                Order items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Product name</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((p) => (
                    <TableRow key={p._id}>
                      <TableCell component="th" scope="row">
                        <img
                          src={p.image}
                          alt=""
                          className={styled.table__productImg}
                        />
                      </TableCell>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.size}</TableCell>
                      <TableCell>x {p.qty}</TableCell>
                      <TableCell>${p.price}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <b style={{ fontSize: 14 }}>TOTAL</b>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell style={{ padding: "20px 0" }}>
                      <b style={{ fontSize: 14 }}>${row.total}</b>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    order: PropTypes.number.isRequired,
    payment_method: PropTypes.string.isRequired,
    paid: PropTypes.string.isRequired,
    coupon: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    user: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        shippingAddress: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function CollapsibleTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" className={styled.table}>
        <TableHead>
          <TableRow>
            <TableCell>Details</TableCell>
            <TableCell>Order</TableCell>
            <TableCell align="left">Payment method</TableCell>
            <TableCell align="left">Paid</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Coupon</TableCell>
            <TableCell align="left">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
