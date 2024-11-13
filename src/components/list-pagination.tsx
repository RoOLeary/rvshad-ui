// import { useSelector } from 'react-redux';
// import { currentUser } from '../services/auth/authSlice';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"


  export const ListPagination = () => {
    // const user = useSelector(currentUser);
    
    return(
        <Pagination>
            {/* {user ? <div className="flex items-center gap-2">
                        <h3>Hello {user}</h3>
                </div> : <p>Nada</p>}   */}
        <PaginationContent>
            <PaginationItem>
            <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
            <PaginationNext href="#" />
            </PaginationItem>
        </PaginationContent>
    </Pagination>
    )
}