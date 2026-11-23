/**
 *
 * now makin here custon hooks
 */

import { useContext } from "react";
import { AuthContext } from "../auth.context";

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
