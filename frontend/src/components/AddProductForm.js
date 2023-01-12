import React from "react";
import "../styles/AddProductForm.css";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";

export default function AddProductForm() {
  return (
    <>
      <Card className="card-stats">
        <Card.Body className="card-background">
          <div>
            <div>General</div>
            <hr />
          </div>
          <div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Name"
                  name="productName"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Product category</Form.Label>
                <Form.Select>
                  <option>Mobiles</option>
                  <option>Orecto Packing Material</option>
                  <option>Apple</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Product brand</Form.Label>
                <Form.Select>
                  <option>Nothing Selected</option>
                  <option>Orecto Packing Material</option>
                  <option>Apple</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Product Unit</Form.Label>
                <Form.Control type="text" placeholder="Product Unit" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Condition</Form.Label>
                <Form.Select>
                  <option>New</option>
                  <option>Used</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Location" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Product Tag</Form.Label>
                <Form.Control type="text" placeholder="Type & Hit Enter" />
              </Form.Group>
            </Form>
          </div>
        </Card.Body>
      </Card>

      <Card className="card-stats card-background mt-4">
        <Card.Body className="card-background">
          <div>
            <div>Images</div>
            <hr />
          </div>
          <div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Gallery Images</Form.Label>
                <Form.Control type="file" placeholder="Product Name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Thumbnail Image</Form.Label>
                <Form.Control type="file" placeholder="Product Name" />
              </Form.Group>
            </Form>
          </div>
        </Card.Body>
      </Card>

      <Card className="card-stats card-background mt-4">
        <Card.Body className="card-background">
          <div>
            <div>Videos</div>
            <hr />
          </div>
          <div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Videos From</Form.Label>
                <Form.Select>
                  <option>Youtube</option>
                  <option>Dailymotion</option>
                  <option>Vimeo</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Video URL</Form.Label>
                <Form.Control type="url" placeholder="Video Link" />
              </Form.Group>
            </Form>
          </div>
        </Card.Body>
      </Card>

      <Card className="card-stats card-background mt-4">
        <Card.Body className="card-background">
          <div>
            <div>Meta Tags</div>
            <hr />
          </div>
          <div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Meta Title</Form.Label>
                <Form.Control type="url" placeholder="Meta Title" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" style={{ height: "100px" }} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Meta Images</Form.Label>
                <Form.Control type="file" placeholder="Meta Title" />
              </Form.Group>
            </Form>
          </div>
        </Card.Body>
      </Card>

      <Card className="card-stats card-background mt-4">
        <Card.Body className="card-background">
          <div>
            <div>Price</div>
            <hr />
          </div>
          <div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Unit price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Unit Price (Base Price)"
                />
              </Form.Group>
            </Form>
          </div>
        </Card.Body>
      </Card>

      <Card className="card-stats card-background mt-4">
        <Card.Body className="card-background">
          <div>
            <div>Description</div>
            <hr />
          </div>
          <div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Editor
                  apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
                  init={{
                    height: 200,
                    menubar: false,
                  }}
                />
              </Form.Group>
            </Form>
          </div>
        </Card.Body>
      </Card>

      <Card className="card-stats card-background mt-4">
        <Card.Body className="card-background">
          <div>
            <div>PDF Specification</div>
            <hr />
          </div>
          <div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>PDF</Form.Label>
                <Form.Control type="file" placeholder="Meta Title" />
              </Form.Group>
            </Form>
          </div>
        </Card.Body>
      </Card>

      <div className="mt-2" style={{ textAlign: "right" }}>
        <button
          className="btn btn-md"
          style={{ backgroundColor: "#008c9c", color: "white" }}
        >
          Save Product
        </button>
      </div>
    </>
  );
}
