const { id } = useParams();

const { data, isLoading } = useQuery({
  queryKey: ["user", id],
  queryFn: () => getUser(Number(id)),
});