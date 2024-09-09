import { ColumnDef } from "@tanstack/react-table";
import { INiveis } from "@/interfaces/nivel";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import axios from "axios";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useCallback, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Niveis from ".";

export const columns = (updateData: () => void): ColumnDef<INiveis>[] => [
    {
        accessorKey: "id",
        header: "#",
    },
    {
        accessorKey: "nivel",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nivel
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "options",
        header: "Opções",
        cell: ({ row }) => {
            const [openDelete, setOpenDelete] = useState(false);
            const [itemToDelete, setItemToDelete] = useState<number | null>(null);
            const [openEdit, setOpenEdit] = useState(false);
            const [newNivel, setNewNivel] = useState<string>(row.original.nivel);

            const submitForm = useCallback(() => {
                if (row.original.id) {
                    axios.put(`http://localhost:8000/api/levels/${row.original.id}`, {
                        nivel: newNivel
                    })
                        .then((response) => {
                            toast("Nível atualizado com sucesso.");
                            setOpenEdit(false);
                            updateData();
                        })
                        .catch((err) => {
                            toast("Erro ao atualizar o nível.");
                            console.log(err);
                        });
                }
            }, [newNivel, row.original.id]);

            const handleDeleteClick = (id: number) => {
                setItemToDelete(id);
                setOpenDelete(true);
            };

            const handleDelete = () => {
                if (itemToDelete !== null) {
                    axios.delete(`http://localhost:8000/api/levels/${itemToDelete}`)
                        .then((response) => {
                            toast(`Nível excluído com sucesso`);
                            setOpenDelete(false);
                            updateData();
                        })
                        .catch((err) => {
                            toast(`Erro ao excluir`);
                        });
                }
            };

            return (
                <div className="flex items-center gap-1">
                    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <AiFillEdit className="text-neutral-800" size={20} />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Atualizar nível</DialogTitle>
                                <DialogDescription>Atualizar nível no sistema</DialogDescription>
                            </DialogHeader>
                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
                                <div className="grid grid-cols-6 items-center text-center">
                                    <Label htmlFor="id">ID</Label>
                                    <Input disabled id="id" className="col-span-3" value={row.original.id} />
                                </div>
                                <div className="grid grid-cols-6 items-center text-center">
                                    <Label htmlFor="nivel">Nivel</Label>
                                    <Input
                                        required
                                        id="nivel"
                                        className="col-span-3"
                                        onChange={(e) => setNewNivel(e.target.value)} // Atualiza o estado com o novo valor
                                    />
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="outline">Cancelar</Button>
                                    </DialogClose>
                                    <Button type="submit">Salvar</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(row.original.id)}>
                                <AiFillDelete className="text-red-600" size={20} />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta ação não pode ser desfeita. Você realmente deseja excluir este nível?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            );
        }
    },
];
