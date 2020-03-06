// // import React from "react";
// // // import logo from "./logo.svg";
// // import "./App.css";
// // import { Container, Row, Col } from "reactstrap";

// // import Userprofile from "./component/userprofile";
// // function App() {
// //   return (
// //     //<center>
// //     <Container>
// //       <Row>
// //         <Col></Col>
// //         <Col>
// //           <Userprofile />
// //         </Col>
// //         <Col></Col>
// //       </Row>
// //     </Container>
// //   );
// // }
// // export default App;

// import React from "react";
// import "./App.css";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Main from "./components/layouts/Main";
// import UpdateBook from "./components/crudBooksAuth/UpdateBook";
// import GetBook from "./components/crudBooksAuth/GetBook";
// import PostBook from "./components/crudBooksAuth/PostBook";
// import LoginForm from "./components/crudBooksAuth/LoginForm";
// import Register from "./components/crudBooksAuth/Register";
// import GetBookbyid from "./components/crudBooksAuth/GetBookbyid";
// import HomeUser from "./components/crudBooksAuth/HomeUser";
// import HomeAdmin from "./components/crudBooksAuth/HomeAdmin";
// import Notfound from "./components/crudBooksAuth/NotFound";
// // import Profile from "./components/UserProfile";
// // import About from "./components/About";

// // import Main from "./components/layouts/Main";
// // import NameForm from "./components/NameForm";
// // import MultiInputForm from "./components/MultiInputForm";
// // import Validasi from "./validationHook/Validasi";

// // const App = props => {
// //   return (
// //         <Router>
// //           <Switch>
// //             <Main>
// //               <Switch>
// //                 <Route exact path="/" component={Home} />
// //                 <Route path="/home" component={Home} />
// //                 <Route path="/profile" component={Profile} />
// //                 <Route path="/about" component={About} />
// //                 <Route path="/form" component={NameForm} />
// //                 <Route path="/multiform" component={MultiInputForm} />
// //                 <Route path="/validateform" component={Validasi} />
// //                 <Route path="/getbook" component={FetchUsingHook} />
// //                 <Route component={Notfound} />
// //               </Switch>
// //             </Main>
// //           </Switch>
// //         </Router>
// //       );
// //     };

// //     export default App;


// import React from "react";
// import "./App.css";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Login from "./crudBooksAuth/LoginForm";
// import Register from "./crudBooksAuth/Register";
// import Notfound from "./crudBooksAuth/NotFound";
// import GetBook from "./crudBooksAuth/GetBook";
// import HomeUser from "./crudBooksAuth/HomeUser";
// import HomeAdmin from "./crudBooksAuth/HomeAdmin";
// import PostBook from "./crudBooksAuth/PostBook";
// import UpdateBook from "./crudBooksAuth/UpdateBook";
// import Main from "./layouts/Main";
// import GetUser from "./crudBooksAuth/GetUser";

// const App = props => {

// const token = JSON.parse(
//     sessionStorage.getItem("persisted_state_hook:token")
// );
// return (
//   <Router>
//     <Switch>
//       <Main>
//         {(() => {
//           if (!token) {
//             return (
//               <>
//                 <Switch>
//                   <Route exact path="/" component={App} />
//                   <Route path="/login" component={Login} />
//                   <Route path="/register" component={Register} />
//                   <Route component={Notfound} />
//                 </Switch>
//               </>
//             );
//           } else if (token.token.Role === "USER") {
//             return (
//               <>
//                 <Switch>
//                   <Route exact path="/homeuser" component={HomeUser} />
//                   <Route path="/getbook" component={GetBook} />
//                   <Route path="/login" component={Login} />
//                   <Route component={Notfound} />
//                 </Switch>
//               </>
//             );
//           } else if (token.token.Role === "ADMIN") {
//             return (
//                 <>
//               <Switch>
//                 <Route exact path="/homeadmin" component={HomeAdmin} />
//                 <Route path="/getbook" component={GetBook} /> 
//                 <Route path="/getuser" component={GetUser} />           
//                 <Route path="/postbook" component={PostBook} /> 
//                 {/* <Route path="/getbyid" component={GETBYID} /> */}
//                 <Route path="/updatebook/:id" component={UpdateBook} />
//                 <Route path="/login" component={Login} />
//                 <Route component={Notfound} />
//               </Switch>
//                 </>
//             );
//           }
//         })()}
//       </Main>
//     </Switch>
//   </Router>
// )
// }



//  export default App;
