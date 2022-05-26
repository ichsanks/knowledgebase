import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "store";

import Header from "./Header";
import Sidebar from "./Sidebar";

import {
  AssignmentDetail,
  Database,
  DatabaseDetail,
  Evaluation,
  EvaluationDetail,
  Internship,
  InternshipDetail,
  Page404,
  Program,
  ProgramDetail,
  Scoring,
  ViewDocument,
} from "screens";

export default function Layout() {
  const { userinfo } = useAuthState();
  const { access } = userinfo;
  const isAdmin = access.some((item: string) =>
    ["KNOWLEDGE_VIEW_ALL", "KNOWLEDGE_CRUD_ALL"].includes(item)
  );
  const isInternal = access.includes("INTERNAL_USER");

  return (
    <BrowserRouter>
      <div id="wrapper">
        <Sidebar />
        <div id="page">
          <Header />
          <Routes>
            <Route path="/">
              <Navigate to="/database" />
            </Route>
            <Route path="/database/:id" element={<DatabaseDetail />} />
            <Route path="/database" element={<Database />} />
            <Route path="/document/:id" element={<ViewDocument />} />
            <Route path="/program/:id" element={<ProgramDetail />} />
            <Route path="/program" element={<Program />} />

            {isInternal && (
              <>
                <Route path="/evaluation/grading/:id" element={<Scoring />} />
                <Route path="/evaluation/:id" element={<EvaluationDetail />} />
                <Route path="/evaluation" element={<Evaluation />} />
              </>
            )}

            {isAdmin && (
              <>
                <Route path="/internship/:id" element={<InternshipDetail />} />
                <Route path="/internship" element={<Internship />} />
                <Route path="/assignment/:id" element={<AssignmentDetail />} />
              </>
            )}

            <Route element={<Page404 />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
