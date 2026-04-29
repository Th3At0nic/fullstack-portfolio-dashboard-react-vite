import { Col, Button, Row, Divider } from "antd";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TError } from "../../types";
import PHImageInput from "../../components/form/PHImageInput";
import { useAddSkillMutation } from "../../redux/features/data/dataManagement.api";
import PHSelect from "../../components/form/PHSelect";

const skillCategories = [
  "Backend",
  "Database & ORM",
  "Caching & Async Processing",
  "Payments & Integrations",
  "Cloud & Infrastructure",
  "File Processing",
  "Frontend",
  "Tools & Platforms",
  "Languages",
  "Familiar With",
];

//this helper function is for handling the change in the select input, since we are using 'tags' mode, it returns an array of values, but we want to store it as a single string in our state, so we take the last value from the array and set it as our category
const handleChange = (value: string[]) => {
  // 'value' is an array from Ant Design tags mode
  // We take the last element so if they type something new, it replaces the old one
  const singleStringValue = value.length > 0 ? value[value.length - 1] : "";
  return singleStringValue;
};

const AddSkill = () => {
  const [addSkill] = useAddSkillMutation();

  const skillCategoryOptions = skillCategories?.map((item) => ({
    value: item,
    label: item,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const categoryValue = handleChange(data.category);

    const dataWithCategory = {
      ...data,
      category: categoryValue,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(dataWithCategory));
    formData.append("file", data.iconUrl);
    //this is just for development testing purpose
    // console.log(Object.fromEntries(formData));

    const res = await addSkill(formData);

    if (res?.data?.success) {
      toast.success("Skill Added Successfully", { duration: 4000 });
    } else if (res?.error) {
      toast.error((res?.error as TError).data.message, { duration: 4000 });
    } else toast.error("Something went wrong");
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Divider>Add Resume</Divider>
          <Row gutter={10}>
            <Col span={24} lg={12} md={12}>
              <PHInput type="text" name="title" label="Skill Title" />
            </Col>
            <Col span={24} lg={12} md={12}>
              <PHInput
                type="text"
                name="description"
                label="Short Description"
              />
            </Col>
            <Col span={24} lg={12} md={12}>
              <PHSelect
                name="category"
                label="Skill Category"
                mode="tags"
                options={skillCategoryOptions}
              />
            </Col>
            <Col span={24} lg={12} md={12}>
              <PHImageInput name="iconUrl" label="Upload Skill Icon" />
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default AddSkill;
