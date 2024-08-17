import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Col, Row } from "react-bootstrap";

const StudentRegistrationForm = ({ onSubmit }) => {
  const [subjects, setSubjects] = useState(0); // Initialize with 0 subjects

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    dateOfBirth: Yup.date().required("Required"),
    gender: Yup.string().required("Required"),
    phoneNumber: Yup.string()
      .length(10, "Must be exactly 10 digits")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    zipCode: Yup.string()
      .length(6, "Must be exactly 6 digits")
      .required("Required"),
    schoolName: Yup.string().required("Required"),
    yearOfPassing: Yup.string()
      .length(4, "Must be exactly 4 digits")
      .required("Required"),
    gpa: Yup.string()
      .matches(/^\d+(\.\d+)?%?$/, "Invalid GPA/Percentage")
      .required("Required"),
    extracurricular: Yup.string().required("Required"),
    skill: Yup.string().when("extracurricular", {
      is: "yes",
      then: Yup.string().required("Required"),
    }),
    experience: Yup.number().when("extracurricular", {
      is: "yes",
      then: Yup.number().required("Required"),
    }),
    subjects: Yup.array().of(
      Yup.object({
        name: Yup.string().required("Required"),
        term1: Yup.number().max(25, "Max 25").required("Required"),
        term2: Yup.number().max(75, "Max 75").required("Required"),
        totalMarks: Yup.number()
          .required("Required")
          .test(
            "is-greater",
            "Total Marks should be greater than or equal to Marks Obtained",
            function (value) {
              const { term1, term2 } = this.parent;
              return value >= term1 + term2;
            }
          ),
      })
    ),
    declaration: Yup.bool().oneOf(
      [true],
      "You must accept the terms and conditions."
    ),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    city: "",
    state: "",
    zipCode: "",
    schoolName: "",
    yearOfPassing: "",
    gpa: "",
    extracurricular: "",
    skill: "",
    experience: "",
    subjects: [],
    declaration: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Row>
            <Col>
              <Field
                name="firstName"
                type="text"
                placeholder="First Name"
                className="form-control"
              />
              <br></br>
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-danger"
              />
            </Col>
            <Col>
              <Field
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="form-control"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-danger"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Field name="dateOfBirth" type="date" className="form-control" />
              <ErrorMessage
                name="dateOfBirth"
                component="div"
                className="text-danger"
              />{" "}
              <br></br>
            </Col>
            <Col>
              <Field name="gender" as="select" className="form-control">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-danger"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Field
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                className="form-control"
              />{" "}
              <br></br>
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-danger"
              />
            </Col>
            <Col>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="form-control"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Field
                name="city"
                type="text"
                placeholder="City"
                className="form-control"
              />{" "}
              <br></br>
              <ErrorMessage
                name="city"
                component="div"
                className="text-danger"
              />
            </Col>
            <Col>
              <Field
                name="state"
                type="text"
                placeholder="State"
                className="form-control"
              />
              <ErrorMessage
                name="state"
                component="div"
                className="text-danger"
              />
            </Col>
            <Col>
              <Field
                name="zipCode"
                type="text"
                placeholder="Zip Code"
                className="form-control"
              />
              <ErrorMessage
                name="zipCode"
                component="div"
                className="text-danger"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Field
                name="schoolName"
                type="text"
                placeholder="School/College Name"
                className="form-control"
              />{" "}
              <br></br>
              <ErrorMessage
                name="schoolName"
                component="div"
                className="text-danger"
              />
            </Col>
            <Col>
              <Field
                name="yearOfPassing"
                type="text"
                placeholder="Year of Passing"
                className="form-control"
              />
              <ErrorMessage
                name="yearOfPassing"
                component="div"
                className="text-danger"
              />
            </Col>
            <Col>
              <Field
                name="gpa"
                type="text"
                placeholder="GPA/Percentage"
                className="form-control"
              />
              <ErrorMessage
                name="gpa"
                component="div"
                className="text-danger"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Field
                name="extracurricular"
                as="select"
                className="form-control"
              >
                <option value="">Extracurricular Activities</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field>{" "}
              <br></br>
              <ErrorMessage
                name="extracurricular"
                component="div"
                className="text-danger"
              />
            </Col>
          </Row>
          {values.extracurricular === "yes" && (
            <Row>
              <Col>
                <Field
                  name="skill"
                  type="text"
                  placeholder="Skill"
                  className="form-control"
                />
                <ErrorMessage
                  name="skill"
                  component="div"
                  className="text-danger"
                />
              </Col>
              <Col>
                <Field
                  name="experience"
                  type="text"
                  placeholder="Experience"
                  className="form-control"
                />
                <ErrorMessage
                  name="experience"
                  component="div"
                  className="text-danger"
                />
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              <label>Number of Subjects:</label>
              <Field
                name="subjectsCount"
                as="select"
                className="form-control"
                onChange={(e) => {
                  const count = Number(e.target.value);
                  setSubjects(count);
                  setFieldValue(
                    "subjects",
                    Array(count).fill({
                      name: "",
                      term1: "",
                      term2: "",
                      totalMarks: "",
                    })
                  );
                }}
              >
                <option value="">Select Number of Subjects</option>
                {[...Array(7)].map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </Field>{" "}
              <br></br>
            </Col>
          </Row>
          {subjects > 0 &&
            Array(subjects)
              .fill()
              .map((_, index) => (
                <Row key={index}>
                  <Col>
                    <Field
                      name={`subjects[${index}].name`}
                      type="text"
                      placeholder="Subject Name"
                      className="form-control"
                    />
                    <ErrorMessage
                      name={`subjects[${index}].name`}
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col>
                    <Field
                      name={`subjects[${index}].term1`}
                      type="number"
                      placeholder="Term 1 Marks"
                      className="form-control"
                    />
                    <ErrorMessage
                      name={`subjects[${index}].term1`}
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col>
                    <Field
                      name={`subjects[${index}].term2`}
                      type="number"
                      placeholder="Term 2 Marks"
                      className="form-control"
                    />
                    <ErrorMessage
                      name={`subjects[${index}].term2`}
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col>
                    <Field
                      name={`subjects[${index}].totalMarks`}
                      type="number"
                      placeholder="Total Marks"
                      className="form-control"
                    />
                    <ErrorMessage
                      name={`subjects[${index}].totalMarks`}
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                </Row>
              ))}
          <Row>
            <Col>
              <Field
                name="declaration"
                type="checkbox"
                className="form-check-input"
              />
              <label className="form-check-label">
                {" "}
                I hereby declare that the information provided above is true to
                the best of my knowledge.
              </label>
              <ErrorMessage
                name="declaration"
                component="div"
                className="text-danger"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type="submit" className="mt-3">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default StudentRegistrationForm;
