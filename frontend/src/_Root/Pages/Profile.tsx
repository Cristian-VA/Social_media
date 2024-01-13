
import { useParams } from "react-router-dom";
import {
  useGetUserByIdMutation,
  useGetPostsByUserID,
} from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/Reusable/Loader";
import GridPostsLists from "@/components/Reusable/GridPostsLists";
import { Routes, Route, Outlet } from "react-router-dom";
import { NavLink, useLocation, Link } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";

const Profile = () => {
  const { id } = useParams();

  const { data: userPosts  } = useGetPostsByUserID(id || "");
  const { data: userDetails, isPending: isLoadingUserDetails } =
    useGetUserByIdMutation(id || "");

  const { user } = useUserContext();

  const { pathname } = useLocation();
  const linkRoute1 = `/profile/${id}`;
  const linkRoute2 = `/profile/${id}/liked-posts`;

  const isActivelink1 = pathname === linkRoute1;
  const isActivelink2 = pathname === linkRoute2;

  return (
    <>
      <div className="container">
        {isLoadingUserDetails ? (
          <div className="fixed top-0 flex justify-center flex-col gap-2 items-center h-screen">
            <Loader color="white" shape="spiner" width="w-[90px] my-auto" />
            <p>Loading profile...</p>
          </div>
        ) : (
          <>
            <div className="max-w-5xl flex  items-center w-full gap-6 md:gap-9 ">
              <img
                src={userDetails?.imageUrl}
                alt=""
                className="w-[100px] md:w-[140px] rounded-[8px] mb-auto"
              />

              <div className="flex flex-col md:gap-2 gap-1 w-full">
                <div className="flex justify-between">
                  <div className="flex flex-col md:gap-2 gap-1">
                    <h1 className="md:text-[32px] tracking-tighter text-[24px]">{userDetails?.name}</h1>
                    <p className="md:text-[18px] text-[16px] tracking-tighter text-slate-500">
                      @{userDetails?.username}{" "}
                    </p>
                  </div>

                  {user.id === userDetails?.$id ? (
                    <Link
                      to={`/update-profile/${userDetails.$id}`}
                      className="regular-link h-10"
                    >
                      <p className="my-auto md:text-[14px] text-[12px] hidden lg:block"> Edit Profile</p>

                      <img
                        src="/assets/Icons/Edit.svg"
                        alt="location Icon"
                        className="w-[24px] h-[24px] my-auto brightness-0 transition invert"
                      />
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex mb-2 gap-4 text-[14px] md:text-[16px]">
                  <div className=" flex-col ">
                    <p className="text-center text-blue-500  ">
                      {userDetails?.posts.length}
                    </p>
                    <p className="">Posts</p>
                  </div>
                  <div className=" flex-col">
                    <p className="text-center text-blue-500 ">
                      {userDetails?.followers || 0}
                    </p>
                    <p>Followers</p>
                  </div>
                  <div className=" flex-col">
                    <p className="text-center text-blue-500 ">
                      {userDetails?.following || 0}
                    </p>
                    <p>Following</p>
                  </div>
                </div>
                <p className="hidden lg:block text-justify">
                  {userDetails?.bio}
                </p>
              </div>
            </div>
            <p className="block lg:hidden text-[14px] text-justify">
              {userDetails?.bio}
            </p>
            <hr className="border-2 border-slate-600 opacity-20  w-full" />


            <div className="flex justify-between w-full max-w-5xl    ">
              <NavLink
                to={`/profile/${id}`}
                className={
                  isActivelink1 ? "active-regular-link" : "regular-link"
                }
              >
                <p className="text-[16px] md:text-[18px] font-light my-auto">
                  Posts
                </p>
              </NavLink>

              <NavLink
                to={`/profile/${id}/liked-posts`}
                className={
                  isActivelink2 ? "active-regular-link" : "regular-link"
                }
              >
                <p className="text-[16px] md:text-[18px] font-light my-auto">
                  View liked posts
                </p>
                <img
                  src="/assets/Icons/liked.svg"
                  alt=""
                  className="w-6 h-6 md:w-7 md:h-7 my-auto"
                />
              </NavLink>
            </div>

            <div className=" w-full">
              <Routes>
                <Route
                  index
                  element={
                    <GridPostsLists
                      posts={userPosts?.documents}
                      showUser={false}
                    />
                  }
                />
                <Route
                  path="/liked-posts"
                  element={
                    <GridPostsLists
                      posts={userDetails?.liked}
                      showUser={true}
                      showStats={false}
                    />
                  }
                />
              </Routes>
              <Outlet />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
