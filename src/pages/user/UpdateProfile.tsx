import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TError } from "../../types";
import { Button, Col, Divider, Row } from "antd";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import PHSelect from "../../components/form/PHSelect";
import PHImageInput from "../../components/form/PHImageInput";
import PHTextArea from "../../components/form/PHTextarea";

// const bioItems = [
//   "Full Stack Web Developer",
//   "MERN & Next.js Specialist",
//   "TypeScript Enthusiast",
//   "Clean Code Practitioner",
//   "REST API & Backend Architect",
//   "React, Redux & Ant Design Expert",
//   "Node.js & Express Developer",
//   "PostgreSQL, MongoDB & Prisma Engineer",
//   "Production-Ready Code Writer",
//   "Scalable System Builder",
//   "Problem Solver & Debugging Lover",
//   "Passionate About Developer Experience",
// ];

const bioItems = [
  "Backend Systems Engineer",
  "Scalable API & System Design",
  "Full Stack Application Developer",
  "Node.js, TypeScript & Distributed Systems",
  "MongoDB, PostgreSQL & Data Modeling",
  "Payment Systems (Stripe, Webhooks)",
  "Asynchronous Processing (Queues, Workers)",
  "Modular Architecture & Clean Code",
  "Cloud Storage & File Pipelines (AWS S3)",
  "Performance & Reliability Focused",
  "Real-World Problem Solving",
];

const UpdateProfile = () => {
  //   const [createBlog] = useCreateBlogMutation();

  const bioOptions = bioItems?.map((item) => ({
    value: item,
    label: item,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("here is the form data:::", data);
    // const formData = new FormData();
    // formData.append("data", JSON.stringify(data));
    // formData.append("file", data.thumbnail);
    // //this is just for development testing purpose
    // // console.log(Object.fromEntries(formData));

    // const res = await createBlog(formData);

    // if (res?.data?.success) {
    //   toast.success("Blog Post Successful", { duration: 4000 });
    // } else if (res?.error) {
    //   toast.error((res?.error as TError).data.message, { duration: 4000 });
    // } else toast.error("Something went wrong");
  };
  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Divider>Update Profile</Divider>
          <Row gutter={10}>
            <Col span={24} lg={8} md={12}>
              <PHInput type="text" name="name" label="Name" />
            </Col>
            <Col span={24} lg={10} md={12}>
              <PHSelect
                name="bio"
                label="Bio / Short Introduction / Role"
                mode="tags"
                options={bioOptions}
              />
            </Col>
            <Col span={24} lg={5} md={12}>
              <PHImageInput name="profilePic" label="Upload Profile Picture" />
            </Col>
            <Col span={24} lg={15} md={12}>
              <PHTextArea
                name="description"
                rows={16}
                label="Personal Description"
              />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput type="text" name="location" label="Location" />
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" block>
            Update Profile
          </Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default UpdateProfile;
