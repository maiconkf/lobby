import Container from "../../components/Container";
import Box from "../../components/Box";
import Footer from "../../components/Footer";
import {
	Box as BoxMui,
	FormControl,
	Grid2,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { useRedeem } from "../../context/Redeem/useRedeem";
import BoxFooter from "../../components/Footer/Box";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./form.schemas";
import createDynamicTheme from "../../../theme";
import { brazilianStatesUFs, formatCep, formatCPF_CNPJ } from "../../utils";
import { ChangeEvent, useEffect, useState } from "react";
import { fetchAddressByCep } from "../../services/cep";
import { IFormData } from "./form.interfaces";
import { useProduct } from "../../context/Product/useProduct";
import { IExtraQuestions } from "../../context/Redeem/redeem.interfaces";
import { useRedeemerMutation } from "../../services/redeems";

const FormTemplate = () => {
	const mutation = useRedeemerMutation();

	const { redeem } = useRedeem();
	const { selectedProducts } = useProduct();
	const theme = createDynamicTheme(redeem);
	const [cep, setCep] = useState("");
	const [address, setAddress] = useState({
		street: "",
		neighborhood: "",
		city: "",
		state: "",
	});

	const handleCepChange = async (
		event: ChangeEvent<HTMLInputElement>,
		field: ControllerRenderProps<IFormData, "cep">
	) => {
		const value = event.target.value;
		const formattedCep = formatCep(value);

		setCep(formattedCep);
		field.onChange(formattedCep);

		if (formattedCep.length === 10) {
			const addressData = await fetchAddressByCep(formattedCep);

			if (addressData) {
				setAddress(addressData);

				setValue("street", addressData.street);
				setValue("city", addressData.city);
				setValue("neighborhood", addressData.neighborhood);
				setValue("state", addressData.state);
			}
		}
	};

	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors },
		register,
	} = useForm({
		mode: "onSubmit",
		resolver: yupResolver(formSchema(redeem!, selectedProducts)),
	});

	const onSubmit = (data: IFormData) => {
		const validData = {
			id: redeem?.id ?? "",
			redeemer_name: data.full_name,
			redeemer_email: data.email,
			redeemer_document_number: data.cpf_cnpj,
			redeemer_zipcode: data.cep,
			redeemer_street: data.street,
			redeemer_number: String(data.number),
			redeemer_complement: data.complement ?? "",
			redeemer_neighborhood: data.neighborhood,
			redeemer_city: data.city,
			redeemer_state: data.state,
			redeemer_country: data.country,
			extra_question_responses:
				data.extra_question_responses?.map((q) => ({
					extra_question_id: q.extra_question_id ?? 0,
					answer: q.answer ?? "",
				})) || [],
			items: selectedProducts.map((product) => ({
				customer_product_id: product.customer_product_id ?? "",
				size_name: product.sizes.length > 0 ? product.sizes[0].name : "",
			})),
		};

		mutation.mutate(validData, {
			onError: (error) => {
				console.error("Error:", error);
			},
		});
	};

	const renderError = (message: string) => (
		<Typography
			component="p"
			color={theme.palette.error.main}
			fontSize="small"
			mt={1}
		>
			{message}
		</Typography>
	);

	const renderExtraQuestions = (
		question: IExtraQuestions,
		field: { value: string | number | undefined }
	) => {
		switch (question.answer_type) {
			case "text_area":
				return (
					<TextField
						label={question.question}
						multiline
						maxRows={4}
						variant="standard"
						{...field}
					/>
				);
			case "date":
				return (
					<TextField
						label={question.question}
						variant="standard"
						{...field}
						type="date"
						placeholder=""
						slotProps={{ inputLabel: { shrink: true } }}
					/>
				);
			case "select_one":
				return (
					<>
						<InputLabel sx={{ left: -14 }}>{question.question}</InputLabel>
						<Select {...field} variant="standard" required>
							{question.options.map((option, idx) => (
								<MenuItem key={idx} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</>
				);
			default:
				return (
					<TextField
						label={question.question}
						variant="standard"
						fullWidth
						{...field}
					/>
				);
		}
	};

	useEffect(() => {
		if (cep) {
			fetchAddressByCep(cep).then((newAddress) => {
				setAddress((prev) => ({ ...prev, street: newAddress?.street }));
			});
		}
	}, [cep]);

	return (
		<Container>
			<Box borderRadius={5} px={4}>
				<Typography component="p" my={2} fontWeight={600} fontSize={20}>
					Finalize o seu resgate
				</Typography>

				<BoxMui
					display="flex"
					justifyContent="space-between"
					flexWrap="wrap"
					gap={1.5}
					pt={2}
					pb={4}
					component="form"
					width="100%"
				>
					<Typography
						component="p"
						color={theme.palette.grey[600]}
						mb={2}
						fontWeight={600}
					>
						Dados do destinatário
					</Typography>
					<FormControl fullWidth sx={{ textAlign: "left" }}>
						<Controller
							control={control}
							name="full_name"
							render={({ field }) => (
								<>
									<TextField
										label="Nome completo"
										variant="standard"
										required
										fullWidth
										{...field}
									/>
									{errors.full_name &&
										renderError(errors.full_name.message ?? "")}
								</>
							)}
						/>
					</FormControl>
					<Grid2 container spacing={3} width="100%">
						<Grid2 size={[12, null, 6]}>
							<FormControl
								fullWidth
								sx={{ textAlign: "left", mt: [1, null, 2] }}
							>
								<Controller
									control={control}
									name="cpf_cnpj"
									render={({ field }) => (
										<>
											<TextField
												label="CPF ou CNPJ"
												variant="standard"
												required
												fullWidth
												{...field}
												value={formatCPF_CNPJ(field.value ?? "")}
												type="tel"
											/>
											{errors.cpf_cnpj &&
												renderError(errors.cpf_cnpj.message ?? "")}
										</>
									)}
								/>
							</FormControl>
						</Grid2>
						<Grid2 size={[12, null, 6]}>
							<FormControl
								fullWidth
								sx={{ textAlign: "left", mt: [1, null, 2] }}
							>
								<Controller
									control={control}
									name="email"
									render={({ field }) => (
										<>
											<BoxMui
												sx={{
													display: "flex",
													flexDirection: "column",
													width: "100%",
													alignItems: "flex-start",
													gap: 1,
												}}
											>
												<TextField
													label="E-mail"
													variant="standard"
													required
													fullWidth
													{...field}
													type="email"
												/>
											</BoxMui>
											{errors.email && renderError(errors.email.message ?? "")}
										</>
									)}
								/>
							</FormControl>
						</Grid2>
					</Grid2>

					<Typography
						component="p"
						color={theme.palette.grey[600]}
						mb={2}
						mt={4}
						fontWeight={600}
					>
						Endereço de entrega
					</Typography>
					<Grid2 container spacing={3} width="100%">
						<Grid2 size={[12, null, 6]}>
							<FormControl
								fullWidth
								sx={{ textAlign: "left", mt: [1, null, 2] }}
							>
								<Controller
									control={control}
									name="cep"
									render={({ field }) => (
										<>
											<TextField
												label="CEP"
												variant="standard"
												required
												fullWidth
												{...field}
												value={cep}
												type="tel"
												onChange={(e: ChangeEvent<HTMLInputElement>) =>
													handleCepChange(e, field)
												}
											/>
											{errors.cep && renderError(errors.cep.message ?? "")}
										</>
									)}
								/>
							</FormControl>
						</Grid2>
						<Grid2 size={[12, null, 6]}>
							<FormControl
								fullWidth
								sx={{ textAlign: "left", mt: [1, null, 2] }}
							>
								<Controller
									control={control}
									name="street"
									render={({ field }) => (
										<>
											<TextField
												label="Rua"
												variant="standard"
												required
												fullWidth
												{...field}
												value={address.street}
												onChange={(e: ChangeEvent<HTMLInputElement>) => {
													const newValue = e.target.value;
													field.onChange(newValue);

													setAddress((prev) => ({
														...prev,
														street: newValue,
													}));
												}}
											/>
											{errors.street &&
												renderError(errors.street.message ?? "")}
										</>
									)}
								/>
							</FormControl>
						</Grid2>
					</Grid2>
					<Grid2 container spacing={3} width="100%">
						<Grid2 size={[12, null, 6]}>
							<Grid2 container spacing={3} width="100%">
								<Grid2 size={6}>
									<FormControl
										fullWidth
										sx={{ textAlign: "left", mt: [1, null, 2] }}
									>
										<Controller
											control={control}
											name="number"
											render={({ field }) => (
												<>
													<TextField
														label="Número"
														variant="standard"
														required
														fullWidth
														{...field}
														type="number"
														onInput={(e: ChangeEvent<HTMLInputElement>) =>
															(e.target.value = Math.max(
																0,
																parseInt(e.target.value)
															)
																.toString()
																.slice(0, 4))
														}
														slotProps={{
															input: {
																style: {
																	appearance: "textfield",
																},
																sx: {
																	"& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
																		{
																			display: "none",
																		},
																},
															},
															htmlInput: { maxLength: 4 },
														}}
														onWheel={(e) => e.currentTarget.blur()}
													/>
													{errors.number &&
														renderError(errors.number.message ?? "")}
												</>
											)}
										/>
									</FormControl>
								</Grid2>
								<Grid2 size={6}>
									<FormControl
										fullWidth
										sx={{ textAlign: "left", mt: [1, null, 2] }}
									>
										<Controller
											control={control}
											name="complement"
											render={({ field }) => (
												<>
													<TextField
														label="Complemento"
														variant="standard"
														fullWidth
														{...field}
													/>
												</>
											)}
										/>
									</FormControl>
								</Grid2>
							</Grid2>
						</Grid2>
						<Grid2 size={[12, null, 6]}>
							<FormControl
								fullWidth
								sx={{ textAlign: "left", mt: [1, null, 2] }}
							>
								<Controller
									control={control}
									name="neighborhood"
									render={({ field }) => (
										<>
											<TextField
												label="Bairro"
												variant="standard"
												required
												fullWidth
												{...field}
												value={address.neighborhood}
												onChange={(e: ChangeEvent<HTMLInputElement>) => {
													const newValue = e.target.value;
													field.onChange(newValue);

													setAddress((prev) => ({
														...prev,
														neighborhood: newValue,
													}));
												}}
											/>
											{errors.neighborhood &&
												renderError(errors.neighborhood.message ?? "")}
										</>
									)}
								/>
							</FormControl>
						</Grid2>
					</Grid2>
					<Grid2 container spacing={3} width="100%">
						<Grid2 size={[12, null, 6]}>
							<FormControl
								fullWidth
								sx={{ textAlign: "left", mt: [1, null, 2] }}
							>
								<Controller
									control={control}
									name="city"
									render={({ field }) => (
										<>
											<TextField
												label="Cidade"
												variant="standard"
												required
												fullWidth
												{...field}
												value={address.city}
												onChange={(e: ChangeEvent<HTMLInputElement>) => {
													const newValue = e.target.value;
													field.onChange(newValue);

													setAddress((prev) => ({
														...prev,
														city: newValue,
													}));
												}}
											/>
											{errors.city && renderError(errors.city.message ?? "")}
										</>
									)}
								/>
							</FormControl>
						</Grid2>
						<Grid2 size={[12, null, 6]}>
							<Grid2 container spacing={3} width="100%">
								<Grid2 size={6}>
									<FormControl
										fullWidth
										sx={{ textAlign: "left", mt: [1, null, 2] }}
									>
										<Controller
											control={control}
											name="state"
											render={({ field }) => (
												<>
													<InputLabel sx={{ left: -14 }}>Estado *</InputLabel>
													<Select
														{...field}
														value={field.value || ""}
														variant="standard"
														onChange={(e) => {
															field.onChange(e.target.value);

															setAddress((prev) => ({
																...prev,
																state: e.target.value,
															}));
														}}
														required
													>
														{brazilianStatesUFs.map((uf) => (
															<MenuItem key={uf} value={uf}>
																{uf}
															</MenuItem>
														))}
													</Select>
													{errors.state &&
														renderError(errors.state.message ?? "")}
												</>
											)}
										/>
									</FormControl>
								</Grid2>
								<Grid2 size={6}>
									<FormControl
										fullWidth
										sx={{ textAlign: "left", mt: [1, null, 2] }}
									>
										<Controller
											control={control}
											name="country"
											render={({ field }) => (
												<>
													<InputLabel sx={{ left: -14 }}>País *</InputLabel>
													<Select {...field} variant="standard" required>
														<MenuItem value="Brasil">Brasil</MenuItem>
													</Select>
													{errors.country &&
														renderError(errors.country.message ?? "")}
												</>
											)}
										/>
									</FormControl>
								</Grid2>
							</Grid2>
						</Grid2>
					</Grid2>

					{selectedProducts.some((product) => product.sizes.length > 0) && (
						<>
							<Typography
								component="p"
								color={theme.palette.grey[600]}
								mb={2}
								mt={4}
								fontWeight={600}
							>
								Tamanhos
							</Typography>

							<Grid2 container spacing={3} width="100%">
								<Grid2 size={[12, null, 6]}>
									<FormControl
										fullWidth
										sx={{ textAlign: "left", mt: [1, null, 2] }}
									>
										<Controller
											control={control}
											name="sizes"
											render={({ field }) => {
												const productWithSizes = selectedProducts.find(
													(product) => product.sizes.length > 0
												);

												const sizesGridName =
													productWithSizes?.sizes_grid?.name;

												return (
													<>
														<InputLabel sx={{ left: -14 }}>
															Qual o seu tamanho ({sizesGridName})? *
														</InputLabel>
														<Select {...field} variant="standard" required>
															{productWithSizes?.sizes.map((size) => (
																<MenuItem key={size.id} value={size.name}>
																	{size.name}
																</MenuItem>
															))}
														</Select>
														{errors.sizes &&
															renderError(errors.sizes.message ?? "")}
													</>
												);
											}}
										/>
									</FormControl>
								</Grid2>
							</Grid2>
						</>
					)}

					{redeem && redeem.extra_questions.length > 0 && (
						<>
							<Typography
								component="p"
								color={theme.palette.grey[600]}
								mb={2}
								mt={4}
								fontWeight={600}
							>
								Perguntas Extras
							</Typography>

							<Grid2 container spacing={3} width="100%">
								{redeem.extra_questions.map((question, idx) => (
									<Grid2 size={[12, null, 6]} key={question.id}>
										<FormControl
											fullWidth
											sx={{ textAlign: "left", mt: [1, null, 2] }}
										>
											<input
												type="hidden"
												{...register(
													`extra_question_responses.${idx}.extra_question_id`
												)}
												value={question.id}
											/>
											<Controller
												control={control}
												name={`extra_question_responses.${idx}.answer`}
												render={({ field }) =>
													renderExtraQuestions(question, {
														...field,
														value:
															typeof field.value === "string" ||
															typeof field.value === "number"
																? field.value
																: "",
													})
												}
											/>
										</FormControl>
									</Grid2>
								))}
							</Grid2>
						</>
					)}
				</BoxMui>
				<BoxFooter onClick={handleSubmit(onSubmit)} />
				{redeem?.title && <Footer company={redeem.title} />}
			</Box>
		</Container>
	);
};

export default FormTemplate;
