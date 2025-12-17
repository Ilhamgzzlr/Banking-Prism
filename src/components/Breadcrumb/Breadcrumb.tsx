type BreadcrumbItem = {
    label: string;
};

interface BreadcrumbProps {
    items?: BreadcrumbItem[];
}

export default function Breadcrumb({
    items = [
        { label: "Model" },
        { label: "Stress Testing" },
    ],
}: BreadcrumbProps) {
    return (
        <nav className="flex items-center text-sm text-gray-500">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <span key={index} className="flex items-center">
                        {index !== 0 && <span className="mx-2">›</span>}
                        <span
                            className={
                                isLast
                                    ? "text-gray-700 font-medium"
                                    : "hover:text-gray-700 cursor-pointer"
                            }
                        >
                            {item.label}
                        </span>
                    </span>
                );
            })}
        </nav>
    );
}


// import { Link, useLocation } from "react-router-dom";

// export default function Breadcrumb() {
//   const location = useLocation();

//   const pathnames = location.pathname
//     .split("/")
//     .filter((x) => x);

//   return (
//     <nav className="flex items-center text-sm text-gray-500">
//       <Link to="/" className="hover:text-gray-700">
//         Home
//       </Link>

//       {pathnames.map((value, index) => {
//         const to = "/" + pathnames.slice(0, index + 1).join("/");
//         const isLast = index === pathnames.length - 1;

//         return (
//           <span key={to} className="flex items-center">
//             <span className="mx-2">›</span>

//             {isLast ? (
//               <span className="text-gray-700 font-medium capitalize">
//                 {value.replace("-", " ")}
//               </span>
//             ) : (
//               <Link
//                 to={to}
//                 className="hover:text-gray-700 capitalize"
//               >
//                 {value.replace("-", " ")}
//               </Link>
//             )}
//           </span>
//         );
//       })}
//     </nav>
//   );
// }
