import * as React from "react"
import { Alert, AlertTitle, AlertDescription } from "../components/Alert"
import { AlertCircle } from "lucide-react"

export default function AlertExample() {
  return (
    <div className="space-y-4 p-6 max-w-md">
      {/* Default alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using this CLI tool.
        </AlertDescription>
      </Alert>

      {/* Destructive alert */}
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later.
        </AlertDescription>
      </Alert>
    </div>
  )
}
