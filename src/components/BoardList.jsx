// import { useEffect, useReducer, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import boardReducer from "../store/reducers/boardReducer";
// import { setLoading } from "../store/actions";
// import * as actions from "../store/actions";

// const initialState = {
//   boards: null,
//   board: null,
//   lists: [],
//   cardsByList: {},
//   checklistsByCard: {},
//   selectedCard: null,
//   showModal: false,
//   showListForm: false,
//   loading: true,
//   error: null,
// };

// const BoardList = () => {
//   const [state, dispatch] = useReducer(boardReducer, initialState);
//   const {
//     boards,
//     board,
//     lists,
//     cardsByList,
//     checklistsByCard,
//     selectedCard,
//     showModal,
//     showListForm,
//     loading,
//     error,
//   } = state;

//   const key = import.meta.env.VITE_API_KEY;
//   const token = import.meta.env.VITE_TOKEN;
//   // const [boardLists, setBoardsLists] = useState(null);
//   const boardLists = boards;
//   const [showForm, setShowForm] = useState(false);
//   const [boardName, setBoardName] = useState("");

//   const fetchData = async () => {
//     // const response = await axios.get(
//     //   `https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`
//     // );
//     // setBoardsLists(response.data);

//     const loadBoardData = async () => {
//       actions.fetchBoardsDetails()(dispatch);
//     };
//     loadBoardData();
//     console.log(state.boards);

//     dispatch(setLoading(false));
//   };

//   const handleCreateBoard = async () => {
//     if (!boardName.trim()) {
//       alert("Board name cannot be empty!");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `https://api.trello.com/1/boards?key=${key}&token=${token}`,
//         null,
//         {
//           params: {
//             name: boardName,
//           },
//         }
//       );

//       console.log("Board created:", response.data);

//       setBoardName("");
//       setShowForm(false);
//       fetchData();
//     } catch (error) {
//       console.error("Failed to create board:", error);
//       alert("Failed to create board. Please try again.");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <h1 className="mt-20 text-5xl text-center font-extrabold">
//         Please Loading wait...
//       </h1>
//     );
//   }

//   if (error) {
//     if (loading) {
//       return (
//         <h1 className="mt-20 text-5xl text-center font-extrabold">
//           Please Error has came please reload the page
//         </h1>
//       );
//     }
//   }

//   return (
//     <div className="flex flex-col px-70 justify-center">
//       <h1 className="text-3xl font-bold text-center m-10 pr-10">BoardLists</h1>
//       <div className="grid grid-cols-4 gap-3">
//         {boardLists.map((board) => {
//           const color = board.prefs.backgroundColor;
//           const img = board.prefs.backgroundImage;
//           let style;
//           if (color) {
//             style = { backgroundColor: color, backgroundSize: "cover" };
//           } else {
//             style = {
//               backgroundImage: `url(${img})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//             };
//           }
//           return (
//             <Link to={`/Boards/${board.id}`} key={board.id}>
//               <div
//                 style={style}
//                 className="h-40 rounded-xl p-2 text-xl font-extrabold"
//               >
//                 {board.name}
//               </div>
//             </Link>
//           );
//         })}
//         <div>
//           {!showForm ? (
//             <div
//               className="border-1 flex justify-center items-center h-40 rounded-xl p-2 text-xl font-extrabold cursor-pointer"
//               onClick={() => setShowForm(true)}
//             >
//               Create Board
//             </div>
//           ) : (
//             <form
//               className="border-2 bg-white shadow-xl flex flex-col gap-2 justify-center items-center h-40 rounded-xl p-4 text-xl font-extrabold"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 console.log("Board Created:", boardName);
//                 setShowForm(false);
//                 setBoardName("");
//               }}
//             >
//               <input
//                 type="text"
//                 value={boardName}
//                 onChange={(e) => setBoardName(e.target.value)}
//                 placeholder="Enter board name"
//                 className="p-2 rounded border text-base font-normal w-full"
//                 required
//               />
//               <div className="flex gap-2">
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
//                   onClick={handleCreateBoard}
//                 >
//                   Create
//                 </button>
//                 <button
//                   type="button"
//                   className="bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400"
//                   onClick={() => setShowForm(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default BoardList;

import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import boardReducer from "../store/reducers/boardReducer";
import * as actions from "../store/actions";

const initialState = {
  boards: [],
  board: null,
  lists: [],
  cardsByList: {},
  checklistsByCard: {},
  selectedCard: null,
  showModal: false,
  showListForm: false,
  loading: true,
  error: null,
};

const BoardList = () => {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const { boards, loading, error } = state;

  const key = import.meta.env.VITE_API_KEY;
  const token = import.meta.env.VITE_TOKEN;

  const [showForm, setShowForm] = useState(false);
  const [boardName, setBoardName] = useState("");

  const fetchData = async () => {
    actions.fetchBoardsDetails()(dispatch);
  };

  const handleCreateBoard = async () => {
    if (!boardName.trim()) {
      alert("Board name cannot be empty!");
      return;
    }

    try {
      const response = await axios.post(
        `https://api.trello.com/1/boards`,
        null,
        {
          params: {
            key,
            token,
            name: boardName,
          },
        }
      );

      console.log("Board created:", response.data);
      setBoardName("");
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error("Failed to create board:", error);
      alert("Failed to create board. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <h1 className="mt-20 text-5xl text-center font-extrabold">
        Loading, please wait...
      </h1>
    );
  }

  if (error) {
    return (
      <h1 className="mt-20 text-3xl text-center text-red-600 font-bold">
        {error}
      </h1>
    );
  }

  return (
    <div className="flex flex-col px-70 justify-center">
      <h1 className="text-3xl font-bold text-center m-10 pr-10">Board Lists</h1>
      <div className="grid grid-cols-4 gap-3">
        {boards.map((board) => {
          const color = board.prefs.backgroundColor;
          const img = board.prefs.backgroundImage;
          let style;
          if (color) {
            style = { backgroundColor: color, backgroundSize: "cover" };
          } else {
            style = {
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            };
          }
          return (
            <Link to={`/Boards/${board.id}`} key={board.id}>
              <div
                style={style}
                className="h-40 rounded-xl p-2 text-xl font-extrabold shadow-lg"
              >
                {board.name}
              </div>
            </Link>
          );
        })}
        <div>
          {!showForm ? (
            <div
              className="border border-gray-400 flex justify-center items-center h-40 rounded-xl p-2 text-xl font-extrabold cursor-pointer bg-white shadow hover:bg-gray-100"
              onClick={() => setShowForm(true)}
            >
              + Create Board
            </div>
          ) : (
            <form
              className="border-2 bg-white shadow-xl flex flex-col gap-2 justify-center items-center h-40 rounded-xl p-4 text-xl font-extrabold"
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateBoard();
              }}
            >
              <input
                type="text"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                placeholder="Enter board name"
                className="p-2 rounded border text-base font-normal w-full"
                required
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Create
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardList;
