"use client"

import * as React from "react"
import { type Candidate } from "../query/get"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, PenTool, Ticket, Printer } from "lucide-react"

interface CandidateRowActionsProps {
    candidate: Candidate
}

export function CandidateRowActions({ candidate }: CandidateRowActionsProps) {
    const [openDialog, setOpenDialog] = React.useState<"profile" | "signature" | "hallticket" | null>(null)

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    const handlePrintHallTicket = () => {
        window.print()
    }

    return (
        <>
            {/* 3 Direct Action Buttons */}
            <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setOpenDialog("profile")}
                    className="h-8 text-xs gap-1"
                >
                    <User className="h-3.5 w-3.5" />
                    Profile
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setOpenDialog("signature")}
                    className="h-8 text-xs gap-1"
                >
                    <PenTool className="h-3.5 w-3.5" />
                    Signature
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setOpenDialog("hallticket")}
                    className="h-8 text-xs gap-1"
                >
                    <Ticket className="h-3.5 w-3.5" />
                    Hall Ticket
                </Button>
            </div>

            {/* 1. Profile Photo Dialog */}
            <Dialog open={openDialog === "profile"} onOpenChange={(open) => !open && setOpenDialog(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Profile Photo</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-4 py-4">
                        <Avatar className="h-32 w-32 border-2 border-primary/20 shadow-md">
                            <AvatarImage src={candidate.profile ?? undefined} alt={candidate.name} className="object-cover" />
                            <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                                {getInitials(candidate.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                            <h3 className="text-lg font-semibold">{candidate.name}</h3>
                            <p className="text-sm text-muted-foreground">Roll No: {candidate.roll}</p>
                        </div>
                        <div className="w-full grid grid-cols-2 gap-2 text-xs border-t pt-3 mt-1">
                            <div><span className="font-semibold text-muted-foreground">Category:</span> {candidate.category ?? "N/A"}</div>
                            <div><span className="font-semibold text-muted-foreground">Phone:</span> {candidate.phone}</div>
                            <div><span className="font-semibold text-muted-foreground">Email:</span> {candidate.email ?? "N/A"}</div>
                            <div><span className="font-semibold text-muted-foreground">DOB:</span> {candidate.dob ? String(candidate.dob) : "N/A"}</div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* 2. Signature Dialog */}
            <Dialog open={openDialog === "signature"} onOpenChange={(open) => !open && setOpenDialog(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Signature</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-4 py-4">
                        <div className="w-full h-36 flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/30 p-4">
                            {candidate.signature ? (
                                <img
                                    src={candidate.signature}
                                    alt={`Signature of ${candidate.name}`}
                                    className="max-h-full max-w-full object-contain"
                                />
                            ) : (
                                <div className="text-center text-muted-foreground text-sm">
                                    <PenTool className="mx-auto h-8 w-8 mb-1 opacity-50" />
                                    No signature uploaded
                                </div>
                            )}
                        </div>
                        <div className="text-center">
                            <h3 className="text-sm font-semibold">{candidate.name}</h3>
                            <p className="text-xs text-muted-foreground">Roll No: {candidate.roll}</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* 3. Hall Ticket Dialog */}
            <Dialog open={openDialog === "hallticket"} onOpenChange={(open) => !open && setOpenDialog(null)}>
                <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="flex flex-row items-center justify-between">
                        <DialogTitle>Admit Card / Hall Ticket</DialogTitle>
                        <Button variant="outline" size="sm" onClick={handlePrintHallTicket} className="gap-1">
                            <Printer className="h-4 w-4" />
                            Print
                        </Button>
                    </DialogHeader>

                    {/* Printable Hall Ticket Card Container */}
                    <div className="border rounded-lg p-5 space-y-4 bg-card text-card-foreground shadow-sm">
                        {/* Header Banner */}
                        <div className="text-center border-b pb-3">
                            <h2 className="text-xl font-bold uppercase tracking-wider text-primary">
                                {candidate.examName ?? "Examination Admit Card"}
                            </h2>
                            {candidate.examPost && (
                                <p className="text-sm text-muted-foreground font-medium">Post: {candidate.examPost}</p>
                            )}
                        </div>

                        {/* Top Info: Candidate Details + Photo */}
                        <div className="flex flex-col sm:flex-row justify-between gap-4 border-b pb-4">
                            <div className="space-y-1.5 text-xs sm:text-sm flex-1">
                                <div><span className="font-semibold text-muted-foreground">Roll Number:</span> <span className="font-bold text-foreground">{candidate.roll}</span></div>
                                <div><span className="font-semibold text-muted-foreground">Candidate Name:</span> <span className="font-medium">{candidate.name}</span></div>
                                {candidate.fathersName && (
                                    <div><span className="font-semibold text-muted-foreground">Father&apos;s Name:</span> {candidate.fathersName}</div>
                                )}
                                <div><span className="font-semibold text-muted-foreground">DOB:</span> {candidate.dob ? String(candidate.dob) : "N/A"}</div>
                                <div><span className="font-semibold text-muted-foreground">Category:</span> {candidate.category ?? "N/A"}</div>
                                <div><span className="font-semibold text-muted-foreground">Phone:</span> {candidate.phone}</div>
                            </div>
                            <div className="flex flex-col items-center justify-center shrink-0">
                                <Avatar className="h-24 w-20 rounded-md border">
                                    <AvatarImage src={candidate.profile ?? undefined} alt={candidate.name} className="object-cover" />
                                    <AvatarFallback className="rounded-md bg-muted text-xs">
                                        {getInitials(candidate.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-[10px] text-muted-foreground mt-1">Photo</span>
                            </div>
                        </div>

                        {/* Exam Schedule & Center Details */}
                        <div className="space-y-2 text-xs sm:text-sm border-b pb-4">
                            <h4 className="font-semibold text-primary uppercase text-xs tracking-wider">Exam Details</h4>
                            <div className="grid grid-cols-2 gap-2 bg-muted/40 p-3 rounded-md">
                                <div><span className="font-semibold text-muted-foreground">Exam Date:</span> {candidate.examDate ? String(candidate.examDate) : "TBA"}</div>
                                <div><span className="font-semibold text-muted-foreground">Exam Time:</span> {candidate.examTime ?? "TBA"}</div>
                                <div><span className="font-semibold text-muted-foreground">Reporting Time:</span> {candidate.examReporting ?? "TBA"}</div>
                                <div><span className="font-semibold text-muted-foreground">Status:</span> {candidate.eligiblity ?? "ELIGIBLE"}</div>
                            </div>
                            <div className="pt-1">
                                <span className="font-semibold text-muted-foreground">Exam Center:</span>
                                <p className="text-xs mt-0.5">{candidate.examCenter ?? "Details will be notified on center allotment."}</p>
                            </div>
                        </div>

                        {/* Bottom: Candidate Signature */}
                        <div className="flex justify-between items-end pt-2">
                            <div className="text-[10px] text-muted-foreground space-y-1">
                                <p>* Please bring this admit card along with a valid ID proof to the exam center.</p>
                                <p>* Arrive at the reporting time specified above.</p>
                            </div>
                            <div className="flex flex-col items-center shrink-0">
                                <div className="h-12 w-28 border flex items-center justify-center bg-white p-1 rounded">
                                    {candidate.signature ? (
                                        <img src={candidate.signature} alt="Signature" className="max-h-full max-w-full object-contain" />
                                    ) : (
                                        <span className="text-[10px] text-muted-foreground">No Signature</span>
                                    )}
                                </div>
                                <span className="text-[10px] text-muted-foreground mt-1">Candidate Signature</span>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
