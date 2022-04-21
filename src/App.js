import { useEffect, useState } from "react";
import "./App.css";
import * as Realm from "realm-web";
import { app, users } from "./mongo";
import Login from "./Login";
import Doc from "./components/Doc";
import DocModal from "./components/DocModal";

function App() {
  const [state, setState] = useState(app.currentUser?.isLoggedIn);
  const [pushState, setPushState] = useState(0);
  const [modalState, setModalState] = useState({ showModal: 0 });
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [docsData, setDocsData] = useState([]);
  const docName = app.currentUser?.profile?.name;
  useEffect(() => Realm.handleAuthRedirect(), []);

  const getModal = (value) => {
    setModalState({ showModal: value });
  };

  const hideModal = (value) => {
    setModalState({ showModal: 0 });
  };

  //Logout the user
  const logout = () => {
    app.currentUser.logOut().then(() => setState(false));
  };

  //Push data to the atlas database
  const putData = async (e) => {
    setPushState(e.timeStamp);
    e.preventDefault();
    await users.insertOne({
      docName: docName,
      doc: {
        name: name,
        message: message,
      },
    });

    setName("");
    setMessage("");
  };

  useEffect(() => {
    const getData = async () => {
      setDocsData(
        await users?.find({ docName: app.currentUser?.profile?.name })
      );
    };

    getData();
  }, [pushState]);

  if (!state) return <Login />;
  return (
    <div className="app">
      <header className="app_header">
        <img
          className="profileImg"
          src={app.currentUser?.profile?.pictureUrl}
          alt=""
        />
        <h3>{app.currentUser?.profile?.firstName}</h3>

        <button onClick={logout}>Logout</button>
      </header>
      <section className="doc_section">
        <form className="app_form" action="">
          <h4 style={{ opacity: 0.6 }}>Enter your note:</h4>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <textarea
            className="form_message"
            cols="30"
            rows="6"
            placeholder="Enter your note"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></textarea>

          <button onClick={putData}>Save</button>
        </form>

        <div className="docs_div">
          {docsData.map((item) => (
            <>
              <a href="##" onClick={() => getModal(item._id)}>
                <Doc
                  key={item.doc.name}
                  name={item.doc.name}
                  message={item.doc.message}
                  id={item._id}
                />
              </a>

              <DocModal
                id={item._id}
                name={item.doc.name}
                message={item.doc.message}
                show={modalState.showModal === item._id}
                hide={() => hideModal(item._id)}
              />
            </>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
