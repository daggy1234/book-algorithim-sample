import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { Formik, Field } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'
import React from "react";


const validation = Yup.object().shape({
  name: Yup.string().required('Enter a valid name'),
  books_read: Yup.string().oneOf(["<18", "10-20"]).required("chose a valid option"),
  fantasy_slider: Yup.number().min(1).max(3).required('Chose valid value'),
  ya_slider: Yup.number().min(1).max(3).required('Chose valid value'),
  classics_slider: Yup.number().min(1).max(3).required('Chose valid value')
})



const Home = () => {

  const [reccobook, Setreccobook] = React.useState(null);

  return (
    <Flex
      mb={8}
      w="full"
      direction={{ base: 'column', md: 'row' }}
    >
      <Box mr={10} maxW="lg" my={10}>
        <Formik
          validationSchema={validation}
          initialValues={{
            name: '',
            books_read: '<18',
            fantasy_slider: 2,
            ya_slider: 2,
            classics_slider: 2,
          }}
          onSubmit={async (values) => {
            const new_js = {
              name: values.name,
              books_read: values.books_read,
              parameters: {
                x: values.fantasy_slider,
                y: values.ya_slider,
                z: values.classics_slider
              }
            };
            console.log(new_js);
            const instance = axios.create({
              baseURL: 'http://localhost:5000',
              headers: { "Access-Control-Allow-Origin": '*' }
            });
            const resp = await instance({
              method: 'post',
              url: "/book-rec", 
              data: new_js
            });
            const js = resp.data.body;
            console.log(js);
            Setreccobook(js);
            
          }}
        >
          {({ handleSubmit, errors, touched, setFieldTouched, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    <Input
                      id='name'
                      placeholder='name'
                      {...field}
                    />
                    <FormErrorMessage>
                      {form.errors.name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.books_read && form.touched.books_read} id="books_read">
                    <FormLabel htmlFor='books_read'>Books Read</FormLabel>
                    <Select name="books_read" id="books_read" onChange={field.onChange}>
                      <option value="<10">{"<10 "}</option>
                      <option value="10-20">{"10-20"}</option>
                    </Select>
                    <FormErrorMessage>
                      {form.errors.books_read}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="fantasy_slider" id="fantasy_slider">
                {({ field, form }) => (
                  <FormControl id="fantasy_slider">
                    <FormLabel htmlFor='fantasy_slider'>Rate the Harry Potter Books (or movies)!</FormLabel>
                    <Slider min={1} max={3} aria-label="" onChangeEnd={(value) => {
                      setFieldTouched(field.name, true);
                      setFieldValue(field.name, value);
                    }}>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <FormErrorMessage>
                      {errors.fantasy_slider}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="ya_slider" id="ya_slider">
                {({ field, form }) => (
                  <FormControl id="ya_slider">
                    <FormLabel htmlFor='ya_slider'>Rate the Fault in our Stars Book (or movie)!</FormLabel>
                    <Slider min={1} max={3} aria-label="" onChangeEnd={(value) => {
                      setFieldTouched(field.name, true);
                      setFieldValue(field.name, value);
                    }}>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <FormErrorMessage>
                      {errors.ya_slider}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="classics_slider" id="classics_slider">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.classics_slider && form.touched.classics_slider} id="classics_slider">
                    <FormLabel htmlFor='classics_slider'>Rate the "To Kill a Mockingbird" Book (or movie)!</FormLabel>
                    <Slider min={1} max={3} aria-label="" onChangeEnd={(value) => {
                      setFieldTouched(field.name, true);
                      setFieldValue(field.name, value);
                    }}>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <FormErrorMessage>
                      {errors.classics_slider}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button mt={8} colorScheme='teal' type='submit'>
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
      <Box alignSelf="flex-end" alignItems="flex-end">
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Image src={reccobook ? reccobook.IMAGE : "https://via.placeholder.com/300"} />
          <Box p='2'>
            <Box
              mt='1'
              fontWeight='semibold'
              as='h4'
              fontSize="lg"
              lineHeight='tight'
              noOfLines={1}
            >
             {reccobook ? reccobook.NAME : "Fill Form to get result"}
            </Box>
            <Text>{reccobook ? reccobook.AUTHOR : "Placeholder"}</Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
