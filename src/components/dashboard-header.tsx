import { useState, useEffect } from 'react';
import { useFeature } from 'use-feature';
import { useDispatch, useSelector } from 'react-redux';
import { Clock, Pin, ChartNetwork, Search, SmilePlus, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SearchBar from './searchbar';
import { currentUser, useLogoutMutation, useLoginMutation, clearAuth } from '@/services/auth/authApi';
import { useGetMyRecentActivityQuery } from '@/services/activity/activity';

interface DashboardHeader {
  className?: string;
}

export default function DashboardHeader() {
  const dispatch = useDispatch();
  // const user = useSelector(currentUser);
  const [logout] = useLogoutMutation();
  const [login] = useLoginMutation();
  const { data: activityData } = useGetMyRecentActivityQuery();
  const powerUserFlag = useFeature('power user only', true);
  const [user, setUser] = useState(null);

//   const handleLogIn = async () => {
//     console.log('handle login');
//     const usr = { email: 'ronan.oleary@findest.eu', password: '@R0n@n1981' };
//     try {
//       await login(usr).unwrap();
//       console.log("Logged in successfully");
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

    const handleLogIn = async () => {
        console.log('handle login');
        const usr = { email: 'ronan.oleary@findest.eu', password: '@p4ss20rd' };
        try {
            setUser(usr);
            console.log("Logged in successfully");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

  const handleLogOut = async () => {
    console.log(`log out ${user?.name || 'Guest'}`);
    try {
      await logout().unwrap();
      dispatch(clearAuth());
      console.log('Logged out successfully');
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  useEffect(() => {
    if (user?.name === 'Ro') {
      console.log('feature flag', powerUserFlag);
    } else if (user?.name === 'Javi') {
      console.log('feature flag but only for Javi', powerUserFlag);
    } else {
      console.log('nothing to see here');
    }
  }, [user]);

  return (
    <header className="flex flex-col gap-6 md:flex-row items-center justify-between bg-gray-150 p-6 w-full bg-gray-300 sticky top-0 z-10">
      <div className="control-buttons">
        <ul className="flex gap-2">
          <li>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button aria-label="Recent"><Clock width={18} color="black" /></Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Recent Activity</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="rotated" className="h-8 w-8 p-0 hidden">
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {activityData && activityData.length > 0 ? (
                        activityData.map((activity: any, idx: string) => (
                          <DropdownMenuItem key={idx}>{activity.name}</DropdownMenuItem>
                        ))
                      ) : (
                        <DropdownMenuItem>No activity found</DropdownMenuItem>
                      )}
                      <DropdownMenuItem><List /> Open in List View</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
          {/* Other menu items */}
        </ul>
      </div>

      <SearchBar />

      <div className="flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-2">
            <h3>Welcome {user.name || "Guest"}</h3>
            <Button variant="outline" className="text-white" onClick={handleLogOut}>Log Out</Button>
          </div>
        ) : (
          <Button variant="outline" className="text-white" onClick={handleLogIn}>Log In</Button>
        )}
        <div className="create-action flex items-center gap-2">
          <Button variant="secondary">Create New</Button>
          <Button name="Happiness" className="hover:bg-slate-300 text-white"><SmilePlus width={18} color="black" /></Button>
        </div>
      </div>
    </header>
  );
}
