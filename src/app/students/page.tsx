"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Spinner,
  Center,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { BsPlusLg, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import PageFrame from "@/component/PageFrame";
import validatePage from "@/component/ValidatePage";
import { useStudentsQuery } from "@/hooks/useStudentsQuery";
import { useDebounce } from "@/hooks/useDebounce";
import { useDeleteStudentMutation } from "@/hooks/useDeleteStudentMutation";
import { Student } from "@/type/student";
import Pagination from "@/component/Pagination";

const Students = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const { data, isLoading, isFetching } = useStudentsQuery(
    debouncedSearchTerm,
    page
  );

  const {
    deleteStudent,
    isLoading: isDeleting,
    isSuccess,
  } = useDeleteStudentMutation();

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);
  if (isLoading || isFetching) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <PageFrame>
      <div className="md:overflow-x-auto  bg-[#F9F9FB] pb-[50px] h-fit p-4 mt-10">
        <div className="mb-4 text-center">
          <h1 className="text-lg text-miva-blue font-semibold">Student List</h1>
          <p className="text-slate-500">
            These are the list of the students in the system
          </p>
        </div>
        <div className="flex sm:flex-row flex-col gap-3 justify-between mb-3">
          <div className="sm:w-[60%] md:w-[289px] bg-[#fff] flex gap-2 items-center rounded-[9px] pl-4 pr-4 border-[1px] border-[#E4EBF5]">
            <BsSearch className="text-miva-blue" />
            <input
              className="text-[13px] text-miva-blue py-[10px] w-[279px] outline-none"
              type="text"
              placeholder="Search by name or major or gpa"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
          <Button
            colorScheme="white"
            size="lg"
            className="bg-miva-blue"
            leftIcon={<BsPlusLg />}
            onClick={() => router.push("/students/new")}
          >
            Add a new student
          </Button>
        </div>
        <TableContainer className="border rounded md:block hidden">
          <Table variant="simple">
            <Thead className="bg-slate-100">
              <Tr className="text-black">
                <Th>Name</Th>
                <Th>Registration No.</Th>
                <Th>Major</Th>
                <Th>DOB</Th>
                <Th>GPA</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.students && data.students.length > 0 ? (
                data.students.map((student: Student) => (
                  <Tr className="text-black" key={student.id}>
                    <Td>{student.name}</Td>
                    <Td>{student.registrationNumber}</Td>
                    <Td>{student.major}</Td>
                    <Td>{moment(student.dob).format("DD MMM, YYYY")}</Td>
                    <Td>{student.gpa}</Td>
                    <Td>
                      <Menu>
                        <MenuButton>
                          <BsThreeDotsVertical />
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() =>
                              router.push(`/students/${student.id}`)
                            }
                          >
                            View Details
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              router.push(`/students/${student.id}/edit`)
                            }
                          >
                            Edit Details
                          </MenuItem>
                          <MenuItem onClick={onOpen}>Delete</MenuItem>
                        </MenuList>
                      </Menu>
                      <AlertDialog
                        leastDestructiveRef={cancelRef}
                        motionPreset="slideInBottom"
                        onClose={onClose}
                        isOpen={isOpen}
                        isCentered
                      >
                        <AlertDialogOverlay className="flex justify-center">
                          <AlertDialogContent>
                            <AlertDialogHeader
                              className="text-black"
                              fontSize="lg"
                              fontWeight="bold"
                            >
                              Delete Student
                            </AlertDialogHeader>

                            <AlertDialogBody className="text-black">
                              Are you sure? You can not undo this action
                              afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button
                                disabled={isDeleting}
                                ref={cancelRef}
                                onClick={onClose}
                              >
                                Cancel
                              </Button>
                              <Button
                                disabled={isDeleting}
                                isLoading={isDeleting}
                                colorScheme="red"
                                onClick={() => deleteStudent(student.id)}
                                ml={3}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={6} className="text-center">
                    No students found
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
        {data?.students && data.students.length > 0 ? (
          data.students.map((student: Student) => (
            <Box
              key={student.id}
              borderWidth="1px"
              borderRadius="md"
              p={4}
              mb={4}
              boxShadow="sm"
              bg="white"
              width="100%"
              className="md:hidden block relative"
            >
              <Box position="absolute" top="10px" right="10px">
                <Menu>
                  <MenuButton>
                    <BsThreeDotsVertical />
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => router.push(`/students/${student.id}`)}
                    >
                      View Details
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        router.push(`/students/${student.id}/edit`)
                      }
                    >
                      Edit Details
                    </MenuItem>
                    <MenuItem onClick={onOpen}>Delete</MenuItem>
                  </MenuList>
                </Menu>
                <AlertDialog
                  leastDestructiveRef={cancelRef}
                  motionPreset="slideInBottom"
                  onClose={onClose}
                  isOpen={isOpen}
                  isCentered
                >
                  <AlertDialogOverlay className="flex justify-center">
                    <AlertDialogContent>
                      <AlertDialogHeader
                        className="text-black"
                        fontSize="lg"
                        fontWeight="bold"
                      >
                        Delete Student
                      </AlertDialogHeader>

                      <AlertDialogBody className="text-black">
                        Are you sure? You can not undo this action afterwards.
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button
                          disabled={isDeleting}
                          ref={cancelRef}
                          onClick={onClose}
                        >
                          Cancel
                        </Button>
                        <Button
                          disabled={isDeleting}
                          isLoading={isDeleting}
                          colorScheme="red"
                          onClick={() => deleteStudent(student.id)}
                          ml={3}
                        >
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </Box>
              <Flex mb={2} flexDirection="column">
                <Text fontWeight="bold" w="80%">
                  Name
                </Text>
                <Text w="80%">{student.name}</Text>
              </Flex>
              <Flex mb={2} flexDirection="column">
                <Text fontWeight="bold" w="80%">
                  Registration No.
                </Text>
                <Text w="80%">{student.registrationNumber}</Text>
              </Flex>
              <Flex mb={2} flexDirection="column">
                <Text fontWeight="bold" w="40%">
                  Major
                </Text>
                <Text w="80%">{student.major}</Text>
              </Flex>
              <Flex mb={2} flexDirection="column">
                <Text fontWeight="bold" w="40%">
                  DOB
                </Text>
                <Text w="80%">{student.dob}</Text>
              </Flex>
              <Flex flexDirection="column">
                <Text fontWeight="bold" w="40%">
                  GPA
                </Text>
                <Text w="80%">{student.gpa}</Text>
              </Flex>
            </Box>
          ))
        ) : (
          <Text>No students found.</Text>
        )}
        <div className="justify-center flex mt-8">
          <Pagination
            currentPage={page}
            totalPages={data?.totalPages || 1}
            onPageChange={(newPage: number) => setPage(newPage)}
          />
        </div>
      </div>
    </PageFrame>
  );
};

export default validatePage(Students);
