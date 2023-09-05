"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserIcon } from "@/components/ui/user-icon"
import Link from "next/link"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { fetchBranchData } from "@/api/branch";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
// Define an interface for your branch data
interface Branch {
  id: number;
  name: string;
  address: string;
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [branchData, setBranchData] = React.useState<Branch[]>([]); // State to hold branch data
  const [selectedBranchId, setSelectedBranchId] = React.useState<number | null>(null); // State to hold selected branch ID
  React.useEffect(() => {
    // Wrap the fetchBranchData call in an async function
    async function fetchAndSetBranchData() {
      try {
        // Make the API call to fetch branch data
        const data = await fetchBranchData();
        setBranchData(data);
      } catch (error) {
        console.error("Error fetching branch data", error);
      }
    }

    // Call the async function to fetch and set branch data
    fetchAndSetBranchData();
  }, []); 

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email">
              Nhập tài khoản
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mật Khẩu</Label>
            <Input id="password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="month">Chi Nhánh</Label>
            <Select>
              <SelectTrigger id="month">
                <SelectValue placeholder="Chi Nhánh" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">January</SelectItem>
                <SelectItem value="2">February</SelectItem>
                <SelectItem value="3">March</SelectItem>
                <SelectItem value="4">April</SelectItem>
                <SelectItem value="5">May</SelectItem>
                <SelectItem value="6">June</SelectItem>
                <SelectItem value="7">July</SelectItem>
                <SelectItem value="8">August</SelectItem>
                <SelectItem value="9">September</SelectItem>
                <SelectItem value="10">October</SelectItem>
                <SelectItem value="11">November</SelectItem>
                <SelectItem value="12">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Đăng Ký Với Email
          </Button>
        </div>
        
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Nếu đã có tài khoản
          </span>
        </div>
      </div>
      <Link href="/auth/login" className="">
          <Button variant="outline" type="button" disabled={isLoading} className="w-full">
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
            <UserIcon />
            )}{" "}
              Đăng Ký
          </Button>
      </Link>
    </div>
  )
}