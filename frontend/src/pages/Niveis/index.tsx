import { Layout } from "@/components/Layout";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { INiveis } from "@/interfaces/nivel";
import { DataTable } from "@/components/ui/data-table";
import { columns as baseColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { CiCirclePlus } from "react-icons/ci";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface IApiResponse {
    data: INiveis[]
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}
export default function Niveis() {
    const [niveis, setNiveis] = useState<INiveis[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = (page: number) => {
        axios.get<IApiResponse>(`http://localhost:8000/api/levels?page=${page}`)
            .then((response) => {
                setNiveis(response.data.data);
                setCurrentPage(response.data.current_page);
                setTotalPages(response.data.last_page);
            })
            .catch((err) => {
                console.error("Erro ao buscar os dados da API:", err);
            });
    };
    const updateData = () => {
        fetchData(currentPage);
    };

    const columns = baseColumns(updateData);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const submitForm = useCallback((e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            nivel: { value: string }
        };
        axios.post("http://localhost:8000/api/levels",
            {
                nivel: target.nivel.value
            }
        ).then((response) => {
            toast("Nível criado com sucesso.");
            fetchData(currentPage);
            // localStorage.setItem('americanos.token', JSON.stringify(response.data));
            // navigate("/dashboard");
        }).catch((err) => {
            toast("Erro ao criar o novo nível.");
            console.log(err);
            // setIsLoading(false);
            // setIsToast(true);
        })
    }, []);

    return (
        <>
            <Layout>
                <div className="mx-auto" style={{ "width": "80vw" }} >
                    <div className="p-10">
                        <div className="pb-4 flex justify-between">
                            <h1 className="font-bold text-lg">Tabela de Niveis</h1>
                        </div>
                        <div className="mx-auto" style={{ "width": "50vw" }}>
                            <div className="">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="flex items-center gap-2">
                                            <CiCirclePlus className="size-5" />
                                            Novo nível
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Novo nível
                                            </DialogTitle>
                                            <DialogDescription>
                                                Criar novo nível no sistema
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form className="space-y-6" action="" onSubmit={submitForm}>
                                            <div className="grid grid-cols-6 items-center text-center">
                                                <Label htmlFor="nivel">Nivel</Label>
                                                <Input required id="nivel" className="col-span-3" />
                                            </div>

                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button type="button" variant="outline">Cancelar</Button>
                                                </DialogClose>
                                                <DialogClose>
                                                    <Button type="submit">Salvar</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <DataTable columns={columns} data={niveis} />
                            <div className="flex justify-end space-x-2 py-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                >
                                    Anterior
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    Próxima
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </Layout>
        </>
    )
}
